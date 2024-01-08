import 'dart:convert';
import 'dart:html';

import 'package:configuration/my_data.dart';
import 'package:http/http.dart' as http;

Future<void> start(
    String finalDataSourceType,
    String finalDataTypeFile,
    String finalSmartWatchOptions,
    bool isHeatMapSelected,
    bool isBarChart,
    bool isWordCloudSelected,
    bool isLineChartSelected,
    bool isCountWordSelected,
    bool isNamedEntitySelected,
    bool isCountWordsPertimeSelected,
    String barenToken,
    List<String> tags,
    String videoId,
    List<String> wordsToCount,
    bool isAverageSelected,
    bool isMaxSelected,
    bool isMinSelected,
    Map<String, dynamic>? fileData) async {
      print('Chegamos aqui');
      final url = Uri.parse('http://localhost:8080/po');
         try {
    MyData myData = MyData(
    finalDataSourceType: finalDataSourceType,
    finalDataTypeFile: finalDataTypeFile,
    finalSmartWatchOptions: finalSmartWatchOptions,
    isHeatMapSelected: isHeatMapSelected,
    isBarChart: isBarChart,
    isWordCloudSelected: isWordCloudSelected,
    isLineChartSelected: isLineChartSelected,
    isCountWordSelected: isCountWordSelected,
    isNamedEntitySelected: isNamedEntitySelected,
    isCountWordsPertimeSelected: isCountWordsPertimeSelected,
    barenToken: barenToken,
    tags: tags,
    videoId: videoId,
    wordsToCount: wordsToCount,
    isAverageSelected: isAverageSelected,
    isMaxSelected: isMaxSelected,
    isMinSelected: isMaxSelected,
    fileData: fileData
  );
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode( myData.toJson()), // Adjust the request body as needed
      );

      if (response.statusCode == 200) {
        // If the server returns a 200 OK response, parse the JSON response
        final Map<String, dynamic> responseData = jsonDecode(response.body);
        print(responseData);
      } else {
        // If the server did not return a 200 OK response, throw an exception.
        print('qual erro ${response.statusCode}');
        throw Exception('Failed to send POST request');
      }
    } catch (error) {
      // Handle any errors that occurred during the HTTP request
      print('Error: $error');
      rethrow;
    }
  

    //      var host =  ContactPoint('192.168.0.135', 9094);
    //   var session =  KafkaSession([host]);

    //   var producer =  Producer(session, 1, 1000);
    //  final data =  {
    //     'finalSmartWatchOptions': finalSmartWatchOptions,
    //     'finalDataTypeFile': finalDataTypeFile,
    //     'data_source': finalDataSourceType,
    //     'is_heat_map_selected': isHeatMapSelected,
    //     'is_bar_chart_selected': isBarChart,
    //     'isWordCloudSelected': isWordCloudSelected,
    //     'is_line_chart_selected': isLineChartSelected,
    //     'is_count_word_selected': isCountWordSelected,
    //     'is_named_entity_selected': isNamedEntitySelected,
    //     'is_count_words_pertime_selected': isCountWordsPertimeSelected,
    //     'bar_chart_token': barenToken,
    //     'tags': tags,
    //     'video_id': videoId,
    //     'words_to_count': wordsToCount,
    //     'is_average_selected': isAverageSelected,
    //     'is_max_selected': isMaxSelected,
    //     'is_min_selected': isMinSelected,
    //   };
    //   var result = await producer.produce([
    //      ProduceEnvelope('begin_process', 0, [ Message(jsonEncode(myData.toJson()).codeUnits, key: 'body'.codeUnits)])
    //   ]);

      //  session.close();

}
Future<void> sendfiles(
    Map<String, dynamic>? fileData) async {
      print('Chegamos aqui');
      final url = Uri.parse('http://localhost:8080/sent');
         try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode( fileData), // Adjust the request body as needed
      );

      if (response.statusCode == 200) {
        // If the server returns a 200 OK response, parse the JSON response
        final Map<String, dynamic> responseData = jsonDecode(response.body);
        print(responseData);
      } else {
        // If the server did not return a 200 OK response, throw an exception.
        print('qual erro ${response.statusCode}');
        throw Exception('Failed to send POST request');
      }
    } catch (error) {
      // Handle any errors that occurred during the HTTP request
      print('Error: $error');
      rethrow;
    }
  
}
