import 'dart:convert';
import 'dart:io';
import 'package:kafkabr/kafka.dart';
import 'package:server/my_data.dart';
import 'package:shelf/shelf_io.dart' as io;

import 'package:shelf/shelf.dart' as shelf;
import 'package:shelf_cors_headers/shelf_cors_headers.dart';
import 'package:shelf_router/shelf_router.dart';

void main() async {
  final app = Router();

  app.post('/po', (shelf.Request request) async {
    print('chegou aqui');
    // Read the request body
    final requestBody = await request.readAsString();

    // Process the data (you can modify this part according to your needs)
    final responseData = {'message': 'Received POST request', 'data': 'processing'};
    Map<String, dynamic> jsonMap = jsonDecode(requestBody);
    print(jsonMap);
     MyData myData =MyData.fromJson(jsonMap) ;
     print(myData.finalDataSourceType);
         var host =  ContactPoint('192.168.0.135', 9094);
      var session =  KafkaSession([host]);

      var producer =  Producer(session, 1, 1000);
    var resultDataSource = await producer.produce([
         ProduceEnvelope('beginPro', 0, [ Message(jsonEncode(myData.toJson()).codeUnits, key: 'body'.codeUnits)])
      ]);
      var resultFlink = await producer.produce([
         ProduceEnvelope('begin', 0, [ Message(jsonEncode(myData.toJson()).codeUnits, key: 'body'.codeUnits)])
      ]);

       session.close();
    // Send a JSON response
    return shelf.Response.ok(
      jsonEncode(responseData),
      headers: {'Content-Type': 'application/json'},
    );
  });
 final overrideHeaders = {
    ACCESS_CONTROL_ALLOW_ORIGIN: 'http://localhost:55383',
    'Content-Type': 'application/json;charset=utf-8'
  };
  // Create a shelf handler
  final handler = const shelf.Pipeline()
      .addMiddleware(shelf.logRequests())
      .addMiddleware(corsHeaders(headers: overrideHeaders))
      .addHandler(app);

  // Start the server on port 8080
  final server =  await io.serve(handler, 'localhost', 8080);
  print('Server running on port ${server.port}');
}
