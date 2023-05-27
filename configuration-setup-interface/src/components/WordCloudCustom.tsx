import React from "react";
import WordCloud from "react-d3-cloud";

export interface MyComponentWordsProps {
  words: WordsCloud[];
}

export interface WordsCloud {
  text: string;
  value: number;
}

const WordCloudCustom: React.FC<MyComponentWordsProps> = ({words}) => {
  const data = [
    {text: "Hey", value: 1000},
    {text: "lol", value: 200},
    {text: "first impression", value: 800},
    {text: "very cool", value: 1000000},
    {text: "duck", value: 10},
  ];

  return (
    <div style={{height: 400, width: 600}}>
      <WordCloud
        data={words}
        width={500}
        height={500}
        font="Times"
        fontStyle="italic"
        fontWeight="bold"
        fontSize={(word) => Math.log2(word.value) * 5}
        spiral="rectangular"
        rotate={(word) => word.value % 10}
        padding={5}
        random={Math.random}
        onWordClick={(event, d) => {
          console.log(`onWordClick: ${d.text}`);
        }}
        onWordMouseOver={(event, d) => {
          console.log(`onWordMouseOver: ${d.text}`);
        }}
        onWordMouseOut={(event, d) => {
          console.log(`onWordMouseOut: ${d.text}`);
        }}
      />
      ,
    </div>
  );
};

export default WordCloudCustom;
