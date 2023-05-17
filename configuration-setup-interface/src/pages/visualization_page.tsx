import "../App.css";
import React, {useState, useEffect} from "react";

import ReactECharts from "echarts-for-react";
import WordCloudCustom, {WordsCloud} from "../components/WordCloudCustom";
import {DataBarContent} from "../App";

interface MyComponentProps {
  dataBar: DataBarContent;
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

const Line: React.FC = () => {
  const options = {
    grid: {top: 8, right: 8, bottom: 24, left: 36},
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

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

const VisualizationPage: React.FC<MyComponentProps> = ({dataBar, word}) => {
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
        <Line></Line>
        <Bar dataBar={dataBar} word={[]}></Bar>
        <WordCloudCustom words={word} />
      </div>
    </div>
  );
};

export default VisualizationPage;
