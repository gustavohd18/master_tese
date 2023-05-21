import { Client } from "twitter-api-sdk";
import {sendStream} from "receive_module";
import { Kafka } from "kafkajs";
import fs from 'fs';

 function writeToCSV(text) {
  const csvText = `text\n${text}\n`;
  fs.writeFile('output.csv', csvText, function (err) {
    if (err) throw err;
    console.log('Text written to CSV file');
  });
}

  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['192.168.0.90:9092'],
  })
  
    const consumer = kafka.consumer({ groupId: 'my-app' })
  //este consumir vem de outro computador com o topico teste2 criados
  await consumer.connect()
  await consumer.subscribe({ topic: 'setup_from_user', fromBeginning: true })

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    // aqui estamos com os dados que vem da interface visual do setup e setamos o twitter a partir dai
    console.log({
      value: message.value.toString(),
    })

    const data2 =  message.value.toString().replace(/\\|'/g, '').replace(/"/g, "'")

    console.log(data2)
   var finalTags = []

const parsedString = JSON.parse(JSON.parse( message.value.toString()));
const convertedString = JSON.stringify(parsedString);
const jsonObject = JSON.parse(convertedString)
 const commandValue = jsonObject.command;
const tokenValue = jsonObject.token;
 const tagValue = jsonObject.tag;

 console.log(commandValue); // setup
 console.log(tokenValue); // eetet
 console.log(tagValue); // ['vini', 'flaflu', 'gremio', 'it', 'fdfs']

      finalTags = tagValue.map((item) => ({
        value: item,
        tag: "soccer",
      }))

      function myFunction() {
        var randomNumber = Math.floor(Math.random() * 4) + 1;
       // Replace the code inside this function with your desired functionality
        if(randomNumber == 4) {
          sendStream("I looked up Dr. Jaison K White. His street address came up as 10th Main road, Suite 2210 in California.")
        }

         if(randomNumber == 1) {
           sendStream("elasticsearch solr comparison on  twitter")

         }

        if(randomNumber == 2) {
          sendStream("solr docker tradeoffs on  twitter")

        }

        if(randomNumber == 3) {
          sendStream("Modrid is the president of the United States")

        }
      }
      
      // Call myFunction every 2 seconds
      setInterval(myFunction, 4000);
//     console.log(finalTags)
    //token AAAAAAAAAAAAAAAAAAAAADoxjwEAAAAAoPOxG2TMiNRWmFRTbQT8Wly4ypU%3DZtZYJyHvbc2A5mBECipTtCldeapOvV3C81eUwMHDB7YorIKWs8

    // const client = new Client(jsonObject.token);

    // const rules = await client.tweets.getRules();

    // const mappedObject = {
    //   ids: rules.data.map(item => item.id),
    //   value: rules.data.map(item => item.value)
    // };

    // await client.tweets.addOrDeleteRules(
    //   {
    //     delete: mappedObject

    //   }
    // );
    // // Create a rules to get from twitter
    // await client.tweets.addOrDeleteRules(
    //   {
    //     add: 
    //       finalTags
    //       // { value: "vinijunior", tag: "vinijunior" },
    //       // { value: "halland", tag: "halland" },
    //       // { value: "realmadrid", tag: "soccer" },
    //       // { value: "manchestercity", tag: "manchestercity" },
    //       // { value: "championsleague", tag: "championsleague" },

    //     ,
    //   }
    // );

    //  const stream = client.tweets.searchStream();

    //  const filename = 'tweets.csv';
    //  const header = 'tweet\n';
    //  fs.writeFileSync(filename, header);
 
    // for await (const tweet of stream) {
    // //  const tweetText = tweet.data.text;
    //  // const csvRow = `"${tweetText}"\n`;
    //   //fs.appendFileSync(filename, csvRow);
    //   //get any twitter need send to receive module
    //   sendStream(tweet.data.text)

    // }
  },
})


