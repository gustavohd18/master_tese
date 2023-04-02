var express = require('express');
var app = express();
var server = require('http').Server(app); 
var io = require('socket.io')(server); // attach socket.io to the server
var kafka1 = require('kafkajs');

const kafka = new kafka1.Kafka({
  clientId: 'my-app',
  brokers: ['192.168.0.46:9092'],
})

 const consumer = kafka.consumer({ groupId: 'test-group' })



server.listen(3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});



// Define action to take when a websocket connection is established
io.on('connection', function (socket) {
	console.log("A client is connected.");


});

async function handlerKafka (io) {
  await consumer.connect()
  await consumer.subscribe({ topic: 'teste2', fromBeginning: true })
//   await consumer.run({
//     eachBatchAutoResolve: true,
//     eachBatch: async ({
//         batch,
//         resolveOffset,
//         heartbeat,
//         commitOffsetsIfNecessary,
//         uncommittedOffsets,
//         isRunning,
//         isStale,
//         pause,
//     }) => {
//         for (let message of batch.messages) {
//             console.log({
//                 topic: batch.topic,
//                 partition: batch.partition,
//                 highWatermark: batch.highWatermark,
//                 message: {
//                     offset: message.offset,
//                     key: message.key.toString(),
//                     value: message.value.toString(),
//                     headers: message.headers,
//                 }
//             })

//             resolveOffset(message.offset)
//             await heartbeat()
//         }

//         // Map each input string to a new object with x and y properties
//         console.log(batch.messages)
// const outputList = batch.messages.map(str => {
//   // Remove the parentheses and split the string by the comma
//   const [x, value] = str.message.valuetoString().replace(/[()]/g, '').split(',');
  
//   // Create a new object with the extracted values
//   return { x, value: parseInt(value) };
// });
// io.emit("teste2", outputList);
//     },
// })
  await consumer.run({
   eachMessage: async ({ topic, partition, message }) => {
    const chars = message.value.toString();
    
    // Remove the parentheses and split the string by the comma
    const [x, y] = chars.replace(/[()]/g, '').split(',');

    // Create a new object with the extracted values
    const outputObj = { x, y: parseInt(y) };

    console.log(outputObj);
    const data = {"x":outputObj.x, "value": outputObj.y}
      io.emit("teste2", data); // Reading Kafka topic value and Kafka message


   },
 })
 }

 handlerKafka(io)
