import 'dart:convert';
import 'dart:io';

import 'package:kafkabr/kafka.dart';

int calculate() {
  return 6 * 7;
}


Future<void> fetchComments(String url, Map<String, String> params, List<Map<String, dynamic>> jsonData) async {
  bool value = true;
  try {
    while (value) {
      final response = await HttpClient().getUrl(Uri.parse('$url?${_encodeParams(params)}')).then((request) => request.close());
      final String data = await response.transform(utf8.decoder).join();
      final Map<String, dynamic> parsedData = jsonDecode(data);

      if (parsedData['items'] != null) {
        final List<dynamic> comments = parsedData['items'];
        for (final comment in comments) {
          final String author = comment['snippet']['topLevelComment']['snippet']['authorDisplayName'];
          final String text = comment['snippet']['topLevelComment']['snippet']['textDisplay'];
          var host =  ContactPoint('192.168.0.135', 9094);
          var session =  KafkaSession([host]);
          print(text);

          var producer =  Producer(session, 1, 1000);
          var result = await producer.produce([
         ProduceEnvelope('processingDataText', 0, [ Message(text.codeUnits, key: 'body'.codeUnits)])
      ]);

       session.close(); 
        }
      }

      // Check if there are more result pages
      if (parsedData['nextPageToken'] != null) {
         value = false;
        params['pageToken'] = parsedData['nextPageToken'];
      }  else {
        value = false;
      }

      // // Wait for 5 seconds before making the next request
      // await Future.delayed(Duration(seconds: 2));
    }
  } catch (error) {
    print('Error fetching comments: $error');
  }
}

String _encodeParams(Map<String, String> params) {
  return params.entries.map((e) => '${e.key}=${Uri.encodeQueryComponent(e.value)}').join('&');
}