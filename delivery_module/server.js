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
 
  await consumer.run({
   eachMessage: async ({ topic, partition, message }) => {
    const chars = message.value.toString().split('::');
    const data = {"x":chars[0], "value": Number(chars[1])}
      io.emit("teste2", data); // Reading Kafka topic value and Kafka message

     console.log({
       value: message.value.toString(),
     })
   },
 })
 }

 handlerKafka(io)
