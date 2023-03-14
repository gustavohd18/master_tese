import { Client } from "twitter-api-sdk";

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
 }

