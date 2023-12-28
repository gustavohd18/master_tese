import 'dart:async';
import 'dart:convert';

import 'package:kafkabr/kafka.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:storage/my_data.dart';
// Terei que enviar para os demais modulos a config enviar a partir daqui para os demais atraves de um endpoint 
// com o kafka
void main(List<String> arguments) async {
  print('Hello Storage!');
   var db = Db("mongodb://localhost:27017/mongo_dart-blog");
  await db.open();
  var collection = db.collection('test');
 await db.drop();
  print('====================================================================');
  print('>> Adding Authors');
  await collection.insertMany([
    {
      'name': 'William Shakespeare',
      'email': 'william@shakespeare.com',
      'age': 587
    },
    {'name': 'Jorge Luis Borges', 'email': 'jorge@borges.com', 'age': 123}
  ]);
  await db.ensureIndex('test',
      name: 'meta', keys: {'_id': 1, 'name': 1, 'age': 1});
  await collection.find().forEach((v) {
    print(v);
  });
  print('====================================================================');
  print('>> Authors ordered by age ascending');
  await collection.find(where.sortBy('age')).forEach(
      (auth) => print("[${auth['name']}]:[${auth['email']}]:[${auth['age']}]"));
  print('====================================================================');
  // var host = ContactPoint('192.168.0.135', 9094);
  // var session =  KafkaSession([host]);
  // var group =  ConsumerGroup(session, 'consumerGroupName');
  // var topics = {
  //   'come_data_processed':<int>{0} // sera de outro topic que ira ler o dado processado
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
  //         print('====================================================================');
  //         print('>> Adding Data');
  //         await collection.insertMany([deserializedData.toJson()]);
  //     if(deserializedData.processData == 'wordcloud') {
  //         await db.open();
  //         var collection = db.collection('test');
  //         print('====================================================================');
  //         print('>> Adding Data');
  //         await collection.insertMany([deserializedData.toJson()]);
  //         // await db.ensureIndex('test',
  //         //   name: 'meta', keys: {'_id': 1, 'name': 1, 'age': 1});
  //     } else if(deserializedData.processData == 'number') {

  //     } else if(deserializedData.processData == 'date') {

  //     }


  //session.close(); // make sure to always close the session when the work is done.
  }

