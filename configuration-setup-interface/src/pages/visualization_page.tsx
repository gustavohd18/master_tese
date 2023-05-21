import "../App.css";
import React, {useState, useEffect} from "react";

import ReactECharts from "echarts-for-react";
import WordCloudCustom, {WordsCloud} from "../components/WordCloudCustom";
import {DataBarContent, DateContent} from "../App";

interface MyComponentProps {
  dataBar: DataBarContent;
  dateBar: DateContent;
  word: WordsCloud[];
}

const WordCloudCustom2 = () => {
  // Set up data for the wordcloud
  const data = [
    {name: "Javascript", value: 100},
    {name: "ReactJS", value: 80},
    {name: "NodeJS", value: 70},
    {name: "CSS", value: 60},
    {name: "HTML", value: 50},
    {name: "Redux", value: 40},
    {name: "Webpack", value: 30},
    {name: "GraphQL", value: 20},
    {name: "MongoDB", value: 10},
    {name: "ExpressJS", value: 5},
  ];

  // Set up Echart options for the wordcloud
  const options = {
    series: [
      {
        type: "wordCloud",
        shape: "circle",
        gridSize: 8,
        sizeRange: [20, 70],
        rotationRange: [-90, 90],
        textStyle: {
          normal: {
            fontFamily: "sans-serif",
            fontWeight: "bold",
            color: function() {
              return (
                "rgb(" +
                Math.round(Math.random() * 255) +
                ", " +
                Math.round(Math.random() * 255) +
                ", " +
                Math.round(Math.random() * 255) +
                ")"
              );
            },
          },
        },
        data: data.map((item) => ({
          name: item.name,
          value: item.value,
        })),
      },
    ],
  };

  // Return the Echart component
  return <ReactECharts option={options} />;
};

const Line: React.FC<MyComponentProps> = ({dateBar}) => {
  const options = {
    grid: {top: 8, right: 8, bottom: 24, left: 36},
    xAxis: {
      type: "time", // X-axis representing dates
    },
    yAxis: {
      type: "value", // Y-axis representing numbers
    },
    series: [
      {
        data: dateBar.value, // Array of [date, number] pairs
        type: "line",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  // const options = {
  //   grid: {top: 8, right: 8, bottom: 24, left: 36},
  //   xAxis: {
  //     type: "time",
  //     data: dateBar.lineX,
  //   },
  //   yAxis: {
  //     type: "value",
  //   },
  //   series: [
  //     {
  //       data: dateBar.lineX,
  //       type: "line",
  //       smooth: true,
  //     },
  //   ],
  //   tooltip: {
  //     trigger: "axis",
  //   },
  // };

  return <ReactECharts option={options} />;
};

const Bar: React.FC<MyComponentProps> = ({dataBar}) => {
  const options = {
    grid: {top: 8, right: 8, bottom: 24, left: 36},
    xAxis: {
      type: "category",
      data: dataBar.lineX,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: dataBar.lineY,
        type: "bar",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return <ReactECharts option={options} />;
};

const VisualizationPage: React.FC<MyComponentProps> = ({
  dataBar,
  word,
  dateBar,
}) => {
  const handleVisualizationToggle = (options: string[]) => {
    console.log(`User selected ${options}`);
  };

  const [dataSource, setDataSource] = useState("");
  const [token, setToken] = useState("");
  const [tag, setTag] = useState("");

  const handleDataSourceSelect = (
    dataSource: string,
    barenToken: string,
    tag: string
  ) => {
    setDataSource(dataSource);
    setToken(barenToken);
    setTag(tag);
  };
  return (
    <div className="container-main">
      <div>
        <div style={{display: "flex", flexDirection: "column"}}></div>
        <Line dataBar={dataBar} word={[]} dateBar={dateBar}></Line>
        <Bar dataBar={dataBar} word={[]} dateBar={dateBar}></Bar>
        <WordCloudCustom words={word} />
      </div>
    </div>
  );
};

export default VisualizationPage;
