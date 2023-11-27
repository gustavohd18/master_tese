import 'dart:async';
import 'dart:convert';

import 'package:data_source/data_source.dart' as data_source;
import 'package:data_source/data_source.dart';
import 'package:data_source/my_data.dart';
import 'package:kafkabr/kafka.dart';
import 'package:twitter_api_v2/twitter_api_v2.dart' as v2;
import 'package:twitter_api_v2/twitter_api_v2.dart';
// Terei que enviar para os demais modulos a config enviar a partir daqui para os demais atraves de um endpoint 
// com o kafka
void main(List<String> arguments) async {
  print('Hello world: ${data_source.calculate()}!');
  var host = ContactPoint('192.168.0.135', 9094);
  var session =  KafkaSession([host]);
  var group =  ConsumerGroup(session, 'consumerGroupName');
  var topics = {
    'begin_process':<int>{0} // list of partitions to consume from.
  };

  var consumer =  Consumer(session, group, topics, 100, 1);
  await for (MessageEnvelope envelope in consumer.consume(limit: 3)) {
    // Assuming that messages were produces by Producer from previous example.
    var value =  String.fromCharCodes(envelope.message.value);
    Map<String, dynamic> jsonMap = jsonDecode(value);
    MyData deserializedData = MyData.fromJson(jsonMap);
    print('Got message: ${envelope.offset}, ${value}');
    envelope.commit('metadata'); // Important.
    //fazer configuracao do x
    if(deserializedData.finalDataSourceType == 'X') {
        final twitter = v2.TwitterApi(
            bearerToken: deserializedData.barenToken,

            //! Automatic retry is available when network error or server error
            //! are happened.
            retryConfig: v2.RetryConfig(
              maxAttempts: 5,
              onExecute: (event) => print(
                'Retry after ${event.intervalInSeconds} seconds... '
                '[${event.retryCount} times]',
              ),
            ),

            //! The default timeout is 10 seconds.
            timeout: Duration(seconds: 20),
          );
            try {

              //! High-performance Volume Stream endpoint is available.
              // final sampleStream = await twitter.tweets.connectSampleStream();
              // await for (final response in sampleStream.stream.handleError(print)) {
              //   print(response);
              // }
             List<FilteringRuleParam> rulesFilter = []; 
            for (var i = 0; i < deserializedData.tags.length; i++) {
               rulesFilter.add( v2.FilteringRuleParam(value: '#${deserializedData.tags[i]}'));
              }
             
              //! Also high-performance Filtered Stream endpoint is available.
              await twitter.tweets.createFilteringRules(
                rules: rulesFilter,
                // rules: [

                //   rulesFilter[1],
                //   // //! You can easily build filtering rule using by "FilteringRule" object.
                //   // v2.FilteringRuleParam(
                //   //   //! => #Tesla has:media
                //   //   value: v2.FilteringRule.of()
                //   //       .matchHashtag('Tesla')
                //   //       .and()
                //   //       .matchTweetContainsMedia()
                //   //       .build(),
                //   // ),
                //   // v2.FilteringRuleParam(
                //   //   //! => (#SpaceX has:media) OR (#SpaceX has:hashtags) sample:50
                //   //   value: v2.FilteringRule.ofSample(percent: 50)
                //   //       .group(
                //   //         v2.FilteringRule.of()
                //   //             .matchHashtag('SpaceX')
                //   //             .and()
                //   //             .matchTweetContainsMedia(),
                //   //       )
                //   //       .or()
                //   //       .group(
                //   //         v2.FilteringRule.of()
                //   //             .matchHashtag('SpaceX')
                //   //             .and()
                //   //             .matchTweetContainsHashtags(),
                //   //       )
                //   //       .build(),
                //   // ),
                // ],
              );

              final filteredStream = await twitter.tweets.connectFilteredStream();
              await for (final response in filteredStream.stream.handleError(print)) {
                // aqui posso pegar os dados e enviar para o kafka de dados
                print(response.data);
                print(response.matchingRules);
              }
            } on TimeoutException catch (e) {
              print(e);
            } on v2.UnauthorizedException catch (e) {
              print(e);
            } on v2.RateLimitExceededException catch (e) {
              print(e);
            } on v2.DataNotFoundException catch (e) {
              print(e);
            } on v2.TwitterUploadException catch (e) {
              print(e);
            } on v2.TwitterException catch (e) {
              print(e.response.headers);
              print(e.body);
              print(e);
            }
    } else if (deserializedData.finalDataSourceType == 'YouTube') { // configuracao youtube
          // Your YouTube Data API key
         // const API_KEY = 'AIzaSyC4q3y4zzKHOmzZGu7SHJ7kO3969MD4XuY';
          final API_KEY = deserializedData.barenToken;
          // ID of the YouTube video you want to fetch comments for
          // final VIDEO_ID = 'vl9yakt_5tc';
          final VIDEO_ID = deserializedData.videoId;
          // Parameters for the initial request
          Map<String, String> params = {
            'key': API_KEY,
            'part': 'snippet',
            'videoId': VIDEO_ID,
            'order': 'time',       // This orders comments from oldest to newest
            'textFormat': 'plainText',
            'maxResults': '20',    // Get 20 comments at a time
          };

          // URL for the YouTube API to get comments
          String url = 'https://www.googleapis.com/youtube/v3/commentThreads';
          List<Map<String, dynamic>> jsonData = [];

          // Fetch comments
          await fetchComments(url, params, jsonData);
    } else {
      //lidaremos aqui diretamente com os dados do arquivo enviar para o processamento
      deserializedData.fileData?.forEach((key, value) {print('$key:$value');});
    }
  }
  session.close(); // make sure to always close the session when the work is done.
}
