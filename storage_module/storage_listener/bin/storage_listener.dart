import 'dart:async';
import 'dart:convert';

import 'package:kafkabr/kafka.dart';
import 'package:mongo_dart/mongo_dart.dart';

void main(List<String> arguments) async {
  print('Hello Storage Listener!');
  // var host = ContactPoint('192.168.0.135', 9094);
  // var session =  KafkaSession([host]);
  // var group =  ConsumerGroup(session, 'consumerGroupName');
  // var topics = {
  //   'consulting_value':<int>{0} 
  // };

  // var consumer =  Consumer(session, group, topics, 100, 1);
  // await for (MessageEnvelope envelope in consumer.consume(limit: 3)) {
  //   // Assuming that messages were produces by Producer from previous example.
  //   var value =  String.fromCharCodes(envelope.message.value);
  //   Map<String, dynamic> jsonMap = jsonDecode(value);
  //   MyData deserializedData = MyData.fromJson(jsonMap);
  //   print('Got message: ${envelope.offset}, ${value}');

  //     var db = Db("mongodb://localhost:27017/mongo_dart-blog");
  //         await db.open();
  //         var collection = db.collection('test');
  // dizer de qual banco de dados vai pegar se test ou outro conforme o from
  //var collection = db.collection(deserializedData.fromVisualization);
    // await collection.find(where.sortBy(deserializedData.query)).forEach(
    //   (auth) => print("[${auth['name']}]:[${auth['email']}]:[${auth['age']}]"));
      //    var host =  ContactPoint('192.168.0.135', 9094);
      // var session =  KafkaSession([host]);

      // var producer =  Producer(session, 1, 1000);
      // var result = await producer.produce([
      //    ProduceEnvelope('data_from_storage', 0, [ Message(jsonEncode(myData.toJson()).codeUnits, key: 'body'.codeUnits)])
      // ]);

      //  session.close();


  //session.close(); // make sure to always close the session when the work is done.
  }

