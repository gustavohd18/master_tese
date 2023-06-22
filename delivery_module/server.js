var express = require('express');
var app = express();
var server = require('http').Server(app); 
//var io = require('socket.io')(server); // attach socket.io to the server
var kafka1 = require('kafkajs');
// Importing the required modules
const WebSocketServer = require('ws');
 //wordcloud
const wordcloudArray = []
const namedEntityArray = []
const totTweetsArray = []

// Function to merge and update data
function mergeData(existingData, newData) {
  const mergedData = [...existingData];

  newData.forEach(newItem => {
    const existingItemIndex = mergedData.findIndex(item => item.text === newItem.text);

    if (existingItemIndex !== -1) {

      // If the text already exists in the existing data, update the value
      if (mergedData[existingItemIndex].value !== newItem.value) {
        mergedData[existingItemIndex].value = newItem.value;

        // ... You can update other properties if needed
      }
    } else {
      // If the text does not exist in the existing data, add the new item
      if(newItem.text == "") {
        console.log("Cheguei aqui em branco")

        //not add
      } else {
        mergedData.push(newItem);

      }
    }
  });

  return mergedData;
}
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8089 })

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
      return  {"text":x,"value": parseInt(value)};
    }); // validar se esta certo

    const mergedData =mergeData(wordcloudArray, outputList);
   wordcloudArray.length = 0
   wordcloudArray.push(...mergedData)
    //format object to json 
    ws.send(JSON.stringify({"phases":false,"namedEntity":false, data:wordcloudArray}));
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
    const outputList = batch.messages.map(message => {
      // Remove the parentheses and split the string by the comma
      const [x, value] = message.value.toString().replace(/[()]/g, '').split(',');

      // Create a new object with the extracted values
      return  {"text":x,"value": parseInt(value)};
    }); // validar se esta certo

    const mergedData =mergeData(namedEntityArray, outputList);
    namedEntityArray.length = 0
    namedEntityArray.push(...mergedData)

   const textArray = namedEntityArray.map(obj => obj.text);
const valueArray = namedEntityArray.map(obj => obj.value);
  //   for (var i = 0; i < batch.messages.length; i++) {
  //     // Remove the parentheses and split the string by the comma
  //     const [x, value] = batch.messages[i].value.toString().replace(/[()]/g, '').split(',');
      
  //     // Create a new object with the extracted values
  //     //array com o primeiro elemento sendo o array de names e o segundo inteiros
  //     array1.push(x)
  //     array2.push(parseInt(value))      // more statements
  //  }
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
    ws.send(JSON.stringify({"phases":false,"namedEntity":true,"isDate":false, data:[textArray, valueArray]}));
  },
});

// terceiro consumer
const consumer3 =  new kafka1.Kafka(consumerConfig).consumer({ groupId: 'consumer3' });
await consumer3.connect();
await consumer3.subscribe({ topic: 'teste231' });
await consumer3.run({
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
    const array3 = []
    const array4 = []
    const outputList = batch.messages.map(message => {
      // Remove the parentheses and split the string by the comma
      const [x, value] = message.value.toString().replace(/[()]/g, '').split(',');
      const dateObject = new Date(x);
      // Create a new object with the extracted values
      return  [dateObject, parseInt(value)];
    }); // validar se esta certo

    totTweetsArray.push(...outputList)
    const uniqueData = [...new Set(totTweetsArray.map(JSON.stringify))].map(JSON.parse);
    totTweetsArray.length = 0
    totTweetsArray.push(...uniqueData)
    totTweetsArray.sort((a, b) => new Date(a[0]) - new Date(b[0]));


//    const dateArray = totTweetsArray.map(obj => obj.date);
// const valueArray = totTweetsArray.map(obj => obj.value);
  //   for (var i = 0; i < batch.messages.length; i++) {
  //     // Remove the parentheses and split the string by the comma
  //     const [x, value] = batch.messages[i].value.toString().replace(/[()]/g, '').split(',');
      
  //     // Create a new object with the extracted values
  //     //array com o primeiro elemento sendo o array de names e o segundo inteiros
  //     const dateObject = new Date(x);

  //     array3.push(dateObject)
  //     array4.push(parseInt(value))      // more statements
  //  }
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
    ws.send(JSON.stringify({"phases":false,"namedEntity":true,"isDate":true, data:totTweetsArray}));
  },
});

// First consumer
const consumer4 = new  kafka1.Kafka(consumerConfig).consumer({ groupId: 'consumer4' });
await consumer4.connect();
await consumer4.subscribe({ topic: 'teste2312' });
await consumer4.run({
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
    const pphases = []
    for (var i = 0; i < batch.messages.length; i++) {
      // Remove the parentheses and split the string by the comma
      const [text, value] = batch.messages[i].value.toString().replace(/[()]/g, '').split(',');
      
      // Create a new object with the extracted values
      //array com o primeiro elemento sendo o array de names e o segundo inteiros
      pphases.push(text)
            // more statements
   }
    //format object to json 
    ws.send(JSON.stringify({"phases":true,"namedEntity":false, data:pphases}));
  },
});
  //handlerKafkaNamed(ws)

 // handlerKafka(ws)

  //on message from client
  ws.on("message", data => {
      console.log(`Client has sent us: ${data}`)
      const newData = JSON.parse(data)
      if(newData["command"] == "setup" ||newData["command"] == "update") {
        sendToKafkaUserSetupInformation(data)
      }

      if(newData["messages"] == "filter") {
        // aqui estamos ja com a mensagem enviada do usuario
        console.log("chegamos no date de filtrar")
        sendToKafkaUserVisualization(newData["filter"])
      }
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

  //producer data para a visualizacao
  async function sendToKafkaUserVisualization(filterInfoWordCloud) {
    console.log(filterInfoWordCloud)
    const prodConfig = {
      groupId: 'my-app',
      brokers: ['192.168.0.90:9092'],
      autoCommit: true,
      autoCommitInterval: 5000,
    }

    const message = {
      value: filterInfoWordCloud, // Enviando a palavra para o kaka
    };

  const kafkaprod = new kafka1.Kafka(prodConfig).producer()
    
  await kafkaprod.connect()
  await kafkaprod.send({
    topic: 'visualization', 
    messages: [
      message

    ],
   })

   await kafkaprod.disconnect();

}

 //producer data para o que for setado do setup
  async function sendToKafkaUserSetupInformation(filterInfoWordCloud) {
    console.log(filterInfoWordCloud)
    const prodConfig = {
      groupId: 'my-app',
      brokers: ['192.168.0.90:9092'],
      autoCommit: true,
      autoCommitInterval: 5000,
    }

    const message = {
      value: JSON.stringify(filterInfoWordCloud), // Provide a valid message payload
    };

  const kafkaprod = new kafka1.Kafka(prodConfig).producer()
    
  await kafkaprod.connect()
  await kafkaprod.send({
    topic: 'setup_from_user', 
    messages: [
      message

    ],
   })

   await kafkaprod.disconnect();

}
//producer data para o que for setado do setup
 async function sendToKafkaUserVisualizationInformation({filterInfoWordCloud}) {

   console.log(filterInfoWordCloud)
   const prodConfig = {
     groupId: 'my-app',
     brokers: ['192.168.0.90:9092'],
     autoCommit: true,
     autoCommitInterval: 5000,
   }

   const message = {
     value: JSON.stringify(filterInfoWordCloud), // Provide a valid message payload
   };

 const kafkaprod = new kafka1.Kafka(prodConfig).producer()
   
 await kafkaprod.connect()
 await kafkaprod.send({
   topic: 'data_from_user_visualization', 
   messages: [
     message

   ],
  })

  await kafkaprod.disconnect();
}
