import { Client } from "twitter-api-sdk";
import {sendStream} from "receive_module";

// sendStream("teste")

// sendStream("teste1")

// sendStream("teste2")

// Twitter data source
 const client = new Client("AAAAAAAAAAAAAAAAAAAAADoxjwEAAAAAoPOxG2TMiNRWmFRTbQT8Wly4ypU%3DZtZYJyHvbc2A5mBECipTtCldeapOvV3C81eUwMHDB7YorIKWs8");

 // Create a rules to get from twitter
 await client.tweets.addOrDeleteRules(
  {
    add: [
      { value: "politica", tag: "politica" },
      { value: "futebol", tag: "futebol" },
      { value: "entretenimento", tag: "entretenimento" },
    ],
  }
);
const rules = await client.tweets.getRules();
console.log(rules);
 const stream = client.tweets.searchStream();
 for await (const tweet of stream) {
  //get any twitter need send to receive module
   //console.log(tweet.data.text);
   sendStream(tweet.data.text)
      console.log(tweet.data.text);

 }

