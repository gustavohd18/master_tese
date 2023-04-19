var express = require('express');
var app = express();
var server = require('http').Server(app); 
//var io = require('socket.io')(server); // attach socket.io to the server
var kafka1 = require('kafkajs');
// Importing the required modules
const WebSocketServer = require('ws');
 
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 })

// const kafka = new kafka1.Kafka({
//   clientId: 'my-app',
//   brokers: ['192.168.0.90:9092'],
// })

 //const consumer = kafka.consumer({ groupId: 'test-group' })

// Creating connection using websocket
wss.on("connection", async ws => {
  console.log("new client connected");

  // sending message to client
  //ws.send('Welcome, you are connected!');
  //ws.send(JSON.stringify([["tes",2], ["testa4",6]]));
  // Consumer options
const consumerConfig = {
  groupId: 'my-group',
  brokers: ['192.168.0.90:9092'],
  autoCommit: true,
  autoCommitInterval: 5000,
};

// First consumer
const consumer1 = new  kafka1.Kafka(consumerConfig).consumer({ groupId: 'consumer1' });
await consumer1.connect();
await consumer1.subscribe({ topic: 'teste2' });
await consumer1.run({
  eachBatchAutoResolve: true,
  eachBatch: async ({
      batch,
      resolveOffset,
      heartbeat,
      commitOffsetsIfNecessary,
      uncommittedOffsets,
      isRunning,
      isStale,
      pause,
  }) => {

    const outputList = batch.messages.map(message => {
      // Remove the parentheses and split the string by the comma
      const [x, value] = message.value.toString().replace(/[()]/g, '').split(',');
      
      // Create a new object with the extracted values
      return  [x, parseInt(value)];
    });
    //format object to json 
    ws.send(JSON.stringify({"namedEntity":false, data:outputList}));
  },
});

// Second consumer
const consumer2 =  new kafka1.Kafka(consumerConfig).consumer({ groupId: 'consumer2' });
await consumer2.connect();
await consumer2.subscribe({ topic: 'teste23' });
await consumer2.run({
  eachBatchAutoResolve: true,
  eachBatch: async ({
      batch,
      resolveOffset,
      heartbeat,
      commitOffsetsIfNecessary,
      uncommittedOffsets,
      isRunning,
      isStale,
      pause,
  }) => {
    const array1 = []
    const array2 = []

    for (var i = 0; i < batch.messages.length; i++) {
      // Remove the parentheses and split the string by the comma
      const [x, value] = batch.messages[i].value.toString().replace(/[()]/g, '').split(',');
      
      // Create a new object with the extracted values
      //array com o primeiro elemento sendo o array de names e o segundo inteiros
      array1.push(x)
      array2.push(value)      // more statements
   }
    // const outputList = batch.messages.map(message => {
    //   // Remove the parentheses and split the string by the comma
    //   const [x, value] = message.value.toString().replace(/[()]/g, '').split(',');
      
    //   // Create a new object with the extracted values
    //   //array com o primeiro elemento sendo o array de names e o segundo inteiros
    //   array1.push(x)
    //   array2.push(value)
    //   return  [[x], [parseInt(value)]];
    // });
    //format object to json 
    ws.send(JSON.stringify({"namedEntity":true, data:[array1, array2]}));
  },
});
  //handlerKafkaNamed(ws)

 // handlerKafka(ws)

  //on message from client
  ws.on("message", data => {
      console.log(`Client has sent us: ${data}`)
  });

  // handling what to do when clients disconnects from server
  ws.on("close", () => {
      console.log("the client has connected");
  });
  // handling client connection error
  ws.onerror = function () {
      console.log("Some Error occurred")
  }
});
console.log("The WebSocket server is running on port 8080");

async function handlerKafka (ws) {
  await consumer.connect()
  await consumer.subscribe({ topic: 'teste2', fromBeginning: true })
  await consumer.run({
    eachBatchAutoResolve: true,
    eachBatch: async ({
        batch,
        resolveOffset,
        heartbeat,
        commitOffsetsIfNecessary,
        uncommittedOffsets,
        isRunning,
        isStale,
        pause,
    }) => {

      const outputList = batch.messages.map(message => {
        // Remove the parentheses and split the string by the comma
        const [x, value] = message.value.toString().replace(/[()]/g, '').split(',');
        
        // Create a new object with the extracted values
        return  [x, parseInt(value)];
      });
      //format object to json 
      ws.send(JSON.stringify({"namedEntity":false, data:outputList}));
    },
})
 }

 async function handlerKafkaNamed (ws) {
  await consumer.connect()
  await consumer.subscribe({ topic: 'teste23', fromBeginning: true })
  await consumer.run({
    eachBatchAutoResolve: true,
    eachBatch: async ({
        batch,
        resolveOffset,
        heartbeat,
        commitOffsetsIfNecessary,
        uncommittedOffsets,
        isRunning,
        isStale,
        pause,
    }) => {

      const outputList = batch.messages.map(message => {
        // Remove the parentheses and split the string by the comma
        const [x, value] = message.value.toString().replace(/[()]/g, '').split(',');
        
        // Create a new object with the extracted values
        return  [x, parseInt(value)];
      });
      //format object to json 
      ws.send(JSON.stringify({"namedEntity":true, data:outputList}));
    },
})
 }
