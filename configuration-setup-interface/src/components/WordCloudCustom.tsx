import React from "react";
import WordCloud from "react-d3-cloud";

export interface MyComponentWordsProps {
  words: WordsCloud[];
  functionDis: (param: string) => void;
}

export interface WordsCloud {
  text: string;
  value: number;
}

const WordCloudCustom: React.FC<MyComponentWordsProps> = ({
  words,
  functionDis,
}) => {
  const data = [
    {text: "Hey", value: 1000},
    {text: "lol", value: 200},
    {text: "first impression", value: 800},
    {text: "very cool", value: 1000000},
    {text: "duck", value: 10},
  ];

  const handleTooltipClick = () => {
    // const xAxisValue = params.name; // Retrieve the xAxis value
    console.log("clicked");
    functionDis("");
    // Call your desired function or perform any action here
  };

  return (
    <div style={{height: 400, width: 600}}>
      <WordCloud
        data={words}
        // data={data}
        width={700}
        height={700}
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
          handleTooltipClick();
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
