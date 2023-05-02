import React, {useState} from "react";
import "../App.css";

import ReactECharts from "echarts-for-react";

const WordCloud: React.FC = () => {
  const data = [
    {name: "apple", value: 100},
    {name: "banana", value: 80},
    {name: "orange", value: 120},
    {name: "pear", value: 70},
    {name: "grape", value: 90},
  ];

  const options2 = {
    series: [
      {
        type: "wordCloud",
        shape: "circle",
        left: "center",
        top: "center",
        width: "80%",
        height: "80%",
        right: null,
        bottom: null,
        sizeRange: [20, 80],
        rotationRange: [-90, 90],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        textStyle: {
          normal: {
            fontFamily: "sans-serif",
            fontWeight: "bold",
            color: function() {
              return (
                "rgb(" +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(",") +
                ")"
              );
            },
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: "#333",
          },
        },
        data: data,
      },
    ],
  };
  return <ReactECharts option={options2} />;
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

const Bar: React.FC = () => {
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

function VisualizationPage() {
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
        <Bar></Bar>
        <WordCloud></WordCloud>
      </div>
    </div>
  );
}

export default VisualizationPage;
