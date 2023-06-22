import { Client } from "twitter-api-sdk";
import {sendStream} from "receive_module";
import { Kafka } from "kafkajs";
import fs from 'fs';
import { franc} from 'franc-min';

const tweets = [
"  🏆 The stage is set for the ultimate showdown! Manchester City vs. Inter in the #UCLFinal! Who will emerge victorious? ⚽️🔥 #MCFCvsInter",

"🌟 The players step onto the pitch, fueled by determination and a hunger for glory. It's time to witness history unfold! #UCLFinal #MCFCvsInter",

"⚽️ Kick-off! The battle for European supremacy begins as Manchester City and Inter lock horns in an electrifying contest. #MCFCvsInter #UCLFinal",

"🔄 Manchester City shows early dominance, dictating play and creating opportunities. Can Inter withstand the pressure? #UCLFinal #MCFCvsInter",

"🧤 The goalkeepers showcase their brilliance, pulling off remarkable saves to keep the scoreline intact. A battle of shot-stoppers! #MCFCvsInter #UCLFinal",

"🔥 GOAL! Manchester City breaks the deadlock with a stunning strike! The crowd erupts as they take the lead. #MCFCvsInter #UCLFinal",

"🌟 Inter responds with relentless attacks, pushing Manchester City's defense to the limit. The tension is palpable! #UCLFinal #MCFCvsInter",

"🚑 A clash of titans! A player from each team sustains an injury, receiving medical attention. Will they recover in time? #MCFCvsInter #UCLFinal",

"⏱️ Half-time whistle blows! Manchester City holds a slender lead, but Inter is far from defeated. The second half promises fireworks! #MCFCvsInter #UCLFinal",

"💥 The second half kicks off with renewed intensity! Inter presses forward, determined to stage a comeback. Can they find the equalizer? #UCLFinal #MCFCvsInter",

"🔄 Tactical substitutions are made as both teams seek an advantage. The managers strategize for the final push to glory. #MCFCvsInter #UCLFinal",

"⚽️ GOAL! Inter equalizes with a clinical finish, sending their fans into delirium! The match hangs in the balance. #MCFCvsInter #UCLFinal",

"🟨 Yellow card! Manchester City's player receives a caution for a reckless challenge. Discipline is crucial at this stage! #UCLFinal #MCFCvsInter",

"🔁 Final substitutions are made, injecting fresh energy into the teams. Who will seize the moment and write their name in history? #MCFCvsInter #UCLFinal",

"💥 GOAL! Manchester City regains the lead with a thunderous strike! The crowd goes wild as they inch closer to glory. #MCFCvsInter #UCLFinal",

"🔄 Inter throws everything forward, desperate to find the equalizer. Manchester City's defense holds firm under immense pressure. #UCLFinal #MCFCvsInter",

"⌛️ Five minutes of stoppage time! Nerves are frayed as the clock ticks down. Can Inter conjure up a late twist? #MCFCvsInter #UCLFinal",

"🏆 FULL-TIME! Manchester City emerges as the champions of Europe, sealing their legacy in a thrilling #UCLFinal victory over Inter. Congratulations! 🎉🎊 #MCFCvsInter",

"🎖️ Man of the Match: halland. Their outstanding performance turned the tide in Manchester City'",

"The stage is set for the ultimate showdown! Manchester City vs. Inter in the #UCLFinal! Who will emerge victorious? ⚽️🔥 #MCFCvsInter",

"The players step onto the pitch, fueled by determination and a hunger for glory. It's time to witness history unfold! #UCLFinal #MCFCvsInter",

"Kick-off! The battle for European supremacy begins as Manchester City and Inter lock horns in an electrifying contest. #MCFCvsInter #UCLFinal",

"Manchester City shows early dominance, dictating play and creating opportunities. Can Inter withstand the pressure? #UCLFinal #MCFCvsInter",

"The goalkeepers showcase their brilliance, pulling off remarkable saves to keep the scoreline intact. A battle of shot-stoppers! #MCFCvsInter #UCLFinal",

"GOAL! Manchester City breaks the deadlock with a stunning strike! The crowd erupts as they take the lead. #MCFCvsInter #UCLFinal",

"Inter responds with relentless attacks, pushing Manchester City's defense to the limit. The tension is palpable! #UCLFinal #MCFCvsInter",

"A clash of titans! A player from each team sustains an injury, receiving medical attention. Will they recover in time? #MCFCvsInter #UCLFinal",

"Half-time whistle blows! Manchester City holds a slender lead, but Inter is far from defeated. The second half promises fireworks! #MCFCvsInter #UCLFinal",

"The second half kicks off with renewed intensity! Inter presses forward, determined to stage a comeback. Can they find the equalizer? #UCLFinal #MCFCvsInter",

"Tactical substitutions are made as both teams seek an advantage. The managers strategize for the final push to glory. #MCFCvsInter #UCLFinal",

"GOAL! Inter equalizes with a clinical finish, sending their fans into delirium! The match hangs in the balance. #MCFCvsInter #UCLFinal",

"Yellow card! Manchester City's player receives a caution for a reckless challenge. Discipline is crucial at this stage! #UCLFinal #MCFCvsInter",

"Final substitutions are made, injecting fresh energy into the teams. Who will seize the moment and write their name in history? #MCFCvsInter #UCLFinal",

"GOAL! Manchester City regains the lead with a thunderous strike! The crowd goes wild as they inch closer to glory. #MCFCvsInter #UCLFinal",

"Inter throws everything forward, desperate to find the equalizer. Manchester City's defense holds firm under immense pressure. #UCLFinal #MCFCvsInter",

"Five minutes of stoppage time! Nerves are frayed as the clock ticks down. Can Inter conjure up a late twist? #MCFCvsInter #UCLFinal",

"FULL-TIME! Manchester City emerges as the champions of Europe, sealing their legacy in a thrilling #UCLFinal victory over Inter. Congratulations! 🎉🎊 #MCFCvsInter",

"🏆 The stage is set for the ultimate showdown! It's the Champions League final, and Inter with their talisman Romelu Lukaku are ready to take on the challenge! ⚽️🔥 #UCLFinal #InterLukaku",

"🌟 The players step onto the pitch, fueled by determination and a hunger for glory. All eyes are on Lukaku as he prepares to showcase his skills on the biggest stage. #UCLFinal #InterLukaku",

"⚽️ Kick-off! The battle for European supremacy begins as Inter, led by Lukaku, lock horns with their formidable opponents. Can he make a decisive impact tonight? #InterLukaku #UCLFinal",

"🔄 Inter starts the game with high intensity, looking to feed Lukaku with precise passes and unleash his goal-scoring prowess. The opposition defense is in for a tough challenge! #UCLFinal #InterLukaku",
"🧤The opposing goalkeeper braces for Lukakus powerful shots, knowing that one slight mistake could be costly. Can Lukaku find a way through and put Inter in the lead? #InterLukaku #UCLFinal",
"🔥 GOAL! Lukaku bursts into action, leaving defenders in his wake as he coolly slots the ball into the back of the net! The crowd goes wild! #InterLukaku #UCLFinal",

"🌟 Lukaku continues to impose his dominance, using his strength and skill to create opportunities for himself and his teammates. The opposition defense is in disarray! #UCLFinal #InterLukaku",

"🚑 A clash of titans! Lukaku and an opposing player collide, both requiring medical attention. Will they recover in time to continue the battle? #InterLukaku #UCLFinal",

"⏱️ Half-time whistle blows! Lukaku's goal has given Inter the advantage, but the game is far from over. The second half promises even more drama! #InterLukaku #UCLFinal",

"💥 The second half kicks off, and Lukaku picks up where he left off. He relentlessly pressures the opposition defense, leaving no room for complacency. #UCLFinal #InterLukaku",

"🔄 Tactical substitutions are made, and the coach's instructions are clear: get the ball to Lukaku, and let him do what he does best. Can he deliver once again? #InterLukaku #UCLFinal",

"⚽️ GOAL! Lukaku unleashes a thunderous strike from outside the box, leaving the goalkeeper rooted to the spot! Inter extends their lead! #InterLukaku #UCLFinal",

"🟨 Yellow card! Lukaku receives a caution for a strong challenge. The opposition defense resorts to desperate measures to stop his rampaging runs. #UCLFinal #InterLukaku",

"🔁 Final substitutions are made, and Lukaku receives a standing ovation from the crowd. He's done his part, and now it's up to his teammates to finish the job. #InterLukaku #UCLFinal",

"💥 GOAL! With Lukaku off the pitch, Inter's other attackers step up to the plate and find the back of the net, sealing their victory in the #UCLFinal! What a team performance! #InterLukaku",

]
// const brazilianNames = [
//   "Ana",
//   "Carlos",
//   "Camila",
//   "Diego",
//   "Fernanda",
//   "Gabriel",
//   "Isabela",
//   "João",
//   "Mariana",
//   "Pedro",
//   "Gustavo"
// ];

// export async function sendToKafka() {
//   const kafka = new Kafka({
//     clientId: 'my-app',
//     brokers: ['192.168.0.90:9092'],
//   })
  
//    const producer = kafka.producer()
  
//   await producer.connect()
//   for (var i = 0; i < 2; i++) {

//     // if(i == 1) {
//     //   await producer.send({
//     //     topic: 'teste231',
//     //     messages: [
//     //       { value: `(, 5)` },
//     //     ],
//     //    })
//     // } 
//     const now = new Date();
//     const randomNumber = Math.floor(Math.random() * 10) + 1;

//     const formattedString = now.toISOString();
//     await producer.send({
//       topic: 'teste23',
//       messages: [
//         { value: `(${brazilianNames[randomNumber]}, ${randomNumber})` },
//       ],
//      })
//  }

// }

//setInterval(sendToKafka, 5000);

function isEnglish(text) {
  const languageCode = franc(text);
  return languageCode === 'eng'; // Check if language code is 'eng' for English
}
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
// tudo passa por este consumer no caso quando clicar na word cloud envia para ca para filtrar e o contrario tbm. onus que quando o usuario voltar vai perder o que tinha talvez o server ta salvando entao podemos evitar esse erro
await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
//     // aqui estamos com os dados que vem da interface visual do setup e setamos o twitter a partir dai
    console.log({
      value: message.value.toString(),
    })

//     const data2 =  message.value.toString().replace(/\\|'/g, '').replace(/"/g, "'")

//   var finalTags = []

const parsedString = JSON.parse(JSON.parse( message.value.toString()));
const convertedString = JSON.stringify(parsedString);
const jsonObject = JSON.parse(convertedString)
 const commandValue = jsonObject.command;
const tokenValue = jsonObject.token;
 const tagValue = jsonObject.tag;
const filterWord = jsonObject.filter;
const isEntitedNamed = jsonObject.isEntitedNamed;
const entitedNamed = jsonObject.entitedNamed;

 console.log(commandValue); // setup
 console.log(tokenValue); // eetet
 console.log(filterWord); // ['vini', 'flaflu', 'gremio', 'it', 'fdfs']

 console.log(tagValue); // ['vini', 'flaflu', 'gremio', 'it', 'fdfs']

      finalTags = tagValue.map((item) => ({
        value: item,
        tag: item,
      }))

// //       // function myFunction() {
// //       //   var randomNumber = Math.floor(Math.random() * 4) + 1;
// //       //  // Replace the code inside this function with your desired functionality
// //       //   if(randomNumber == 4) {
// //       //     sendStream("I looked up Dr. Jaison K White. His street address came up as 10th Main road, Suite 2210 in California.")
// //       //   }

// //       //    if(randomNumber == 1) {
// //       //      sendStream("elasticsearch solr comparison on  twitter")

// //       //    }

// //       //   if(randomNumber == 2) {
// //       //     sendStream("solr docker tradeoffs on  twitter")

// //       //   }

// //       //   if(randomNumber == 3) {
// //       //     sendStream("Modrid is the president of the United States")

// //       //   }
// //       // }
      
// //       // // Call myFunction every 2 seconds
// //       // setInterval(myFunction, 4000);
// // //     console.log(finalTags)
// //     token AAAAAAAAAAAAAAAAAAAAADoxjwEAAAAAoPOxG2TMiNRWmFRTbQT8Wly4ypU%3DZtZYJyHvbc2A5mBECipTtCldeapOvV3C81eUwMHDB7YorIKWs8

    const client = new Client("AAAAAAAAAAAAAAAAAAAAALV9TAEAAAAAP3ewlXY3kiK%2BRPCwSoM2PdAmsSE%3De95FIYI6naAMw52KQakqu0UbzUSSjM9CzDN6PGfHvoEddXibaa");

    const rules = await client.tweets.getRules();

    const mappedObject = {
      ids: rules.data.map(item => item.id),
      value: rules.data.map(item => item.value)
    };

    await client.tweets.addOrDeleteRules(
      {
        delete: mappedObject

      }
    );
    // Create a rules to get from twitter
    await client.tweets.addOrDeleteRules(
      {
        add: 
         // finalTags
         [ 
          //{ value: "vinijunior", tag: "vinijunior" },
          { value: "halland", tag: "halland" },
         // { value: "realmadrid", tag: "soccer" },
          { value: "manchestercity", tag: "manchestercity" },
          //{ value: "championsleague", tag: "premierleague" },
          { value: "championsleague", tag: "championsleague" },
          { value: "inter", tag: "inter" },
          { value: "lukaku", tag: "lukaku" },

         ]
      }
    );

     const stream = client.tweets.searchStream();

    //  const filename = 'tweets.csv';
    //  const header = 'tweet\n';
    //  fs.writeFileSync(filename, header);
 
    for await (const tweet of stream) {
      const tweetText = tweet.data.text;
     // const csvRow = `"${tweetText}"\n`;
      //fs.appendFileSync(filename, csvRow);
      //get any twitter need send to receive module
      const tweetLanguage = tweet.data.lang;

     // console.log(`Text: ${tweetText}`);
      const isTextEnglish = isEnglish(tweetText);
      //console.log(`Is English: ${isTextEnglish}`); 
      if(isTextEnglish) {
        if(tweet.data.text.includes("https") || tweet.data.text.includes("http") ) {

        } else {
          const data = {
            filter: filterWord,
            isEntitedNamed: isEntitedNamed,
            entitedNamed: entitedNamed,
            text: tweet.data.text,
          };
          setTimeout(() =>sendStream(data),20000)
        }
      }
    }
   },
})


