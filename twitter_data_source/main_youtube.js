import { Client } from "twitter-api-sdk";
import {sendStream} from "receive_module";
import { Kafka } from "kafkajs";
import fs from 'fs';
import { franc} from 'franc-min';
import axios from 'axios';


// Your YouTube Data API key
const API_KEY = 'AIzaSyC4q3y4zzKHOmzZGu7SHJ7kO3969MD4XuY';

// ID of the YouTube video you want to fetch comments for
const VIDEO_ID = 'vl9yakt_5tc';

// Parameters for the initial request
const params = {
  key: API_KEY,
  part: 'snippet',
  videoId: VIDEO_ID,
  order: 'time',       // This orders comments from oldest to newest
  textFormat: 'plainText',
  maxResults: 20       // Get 20 comments at a time
};

// URL for the YouTube API to get comments
const url = 'https://www.googleapis.com/youtube/v3/commentThreads';
const jsonData = [];

// Assuming 'dataArray' is an array of objects with 'text' property
(async () => {
  try {
    while (true) {
      const response = await axios.get(url, { params });
      const data = response.data;

      if (data.items) {
        const comments = data.items;
        for (const comment of comments) {
          const author = comment.snippet.topLevelComment.snippet.authorDisplayName;
          const text = comment.snippet.topLevelComment.snippet.textDisplay;
          const wordsArray = text.split(' ');
          for (const text3 of wordsArray) {
          // sendStream(text) talvez alterar aqui para passar a data tbm
          console.log(`${text3}`);
          const text = text3;
          const value = Math.floor(Math.random() * 100); // Generate a random value
        
          jsonData.push({ text, value });
          }
        }
      }

      // Check if there are more result pages
      if (data.nextPageToken) {
        params.pageToken = data.nextPageToken;
      } else {
        const jsonContent = JSON.stringify(jsonData, null, 2);

        fs.writeFile('output.json', jsonContent, 'utf8', (err) => {
          if (err) {
            console.error(`Error writing JSON file: ${err}`);
          } else {
            console.log(`JSON file 'output.json' has been created successfully.`);
          }
        });
      
        break;
      }

      // Wait for 5 seconds before making the next request
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  } catch (error) {
    console.error(`Error fetching comments: ${error}`);
  }
})();

  
  //   const consumer = kafka.consumer({ groupId: 'my-app' })
  // //este consumir vem de outro computador com o topico teste2 criados
  // await consumer.connect()
  // await consumer.subscribe({ topic: 'setup_from_user', fromBeginning: true })
// tudo passa por este consumer no caso quando clicar na word cloud envia para ca para filtrar e o contrario tbm. onus que quando o usuario voltar vai perder o que tinha talvez o server ta salvando entao podemos evitar esse erro
// await consumer.run({
//   eachMessage: async ({ topic, partition, message }) => {
// //     // aqui estamos com os dados que vem da interface visual do setup e setamos o twitter a partir dai
//     console.log({
//       value: message.value.toString(),
//     })

// //     const data2 =  message.value.toString().replace(/\\|'/g, '').replace(/"/g, "'")

// //   var finalTags = []

// const parsedString = JSON.parse(JSON.parse( message.value.toString()));
// const convertedString = JSON.stringify(parsedString);
// const jsonObject = JSON.parse(convertedString)
//  const commandValue = jsonObject.command;
// const tokenValue = jsonObject.token;
//  const tagValue = jsonObject.tag;
// const filterWord = jsonObject.filter;
// const isEntitedNamed = jsonObject.isEntitedNamed;
// const entitedNamed = jsonObject.entitedNamed;

//  console.log(commandValue); // setup
//  console.log(tokenValue); // eetet
//  console.log(filterWord); // ['vini', 'flaflu', 'gremio', 'it', 'fdfs']

//  console.log(tagValue); // ['vini', 'flaflu', 'gremio', 'it', 'fdfs']


    // const mappedObject = {
    //   ids: rules.data.map(item => item.id),
    //   value: rules.data.map(item => item.value)
    // };

    // await client.tweets.addOrDeleteRules(
    //   {
    //     delete: mappedObject

    //   }
    // );
    // Create a rules to get from twitter

    //  const stream = client.tweets.searchStream();

    // //  const filename = 'tweets.csv';
    // //  const header = 'tweet\n';
    // //  fs.writeFileSync(filename, header);
 
    // for await (const tweet of stream) {
    //   const tweetText = tweet.data.text;
    //   const csvRow = `"${tweetText}"\n`;
    //   fs.appendFileSync(filename, csvRow);
    //   //get any twitter need send to receive module
    // //   const tweetLanguage = tweet.data.lang;

    // //  // console.log(`Text: ${tweetText}`);
    // //   const isTextEnglish = isEnglish(tweetText);
    // //   //console.log(`Is English: ${isTextEnglish}`); 
    // //   if(isTextEnglish) {
    // //     if(tweet.data.text.includes("https") || tweet.data.text.includes("http") ) {

    // //     } else {
    // //       const data = {
    // //         filter: filterWord,
    // //         isEntitedNamed: isEntitedNamed,
    // //         entitedNamed: entitedNamed,
    // //         text: tweet.data.text,
    // //       };
    // //       setTimeout(() =>sendStream(data),20000)
    // //     }
    // //   }
    // }
  //  },
// })


