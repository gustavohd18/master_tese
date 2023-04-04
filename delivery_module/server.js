var express = require('express');
var app = express();
var server = require('http').Server(app); 
//var io = require('socket.io')(server); // attach socket.io to the server
var kafka1 = require('kafkajs');
// Importing the required modules
const WebSocketServer = require('ws');
 
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 })

const kafka = new kafka1.Kafka({
  clientId: 'my-app',
  brokers: ['192.168.0.46:9092'],
})

 const consumer = kafka.consumer({ groupId: 'test-group' })

// Creating connection using websocket
wss.on("connection", ws => {
  console.log("new client connected");

  // sending message to client
  ws.send('Welcome, you are connected!');
  ws.send(JSON.stringify([["tes",2], ["testa4",6]]));
  //handlerKafka(ws)


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
        return  [x, parseInt(value)] ;
      });
      //format object to json 
      ws.send(JSON.stringify(outputList));
    },
})
 }
