import "../App.css";
import React, {useState, useEffect, useRef} from "react";

import ReactECharts from "echarts-for-react";
import WordCloudCustom, {WordsCloud} from "../components/WordCloudCustom";
import {DataBarContent, DateContent} from "../App";

interface MyComponentProps {
  dataBar: DataBarContent;
  dateBar: DateContent;
  word: WordsCloud[];
  functionDis: (param: string) => void;
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
    grid: {top: 8, right: 8, bottom: 24, left: 50},
    dataZoom: [
      {
        type: "inside", // Enable zooming using the mouse wheel or touch gesture inside the chart
        start: 0, // Start position of the zoom window
        end: 100, // End position of the zoom window
      },
      {
        type: "slider", // Show a slider bar at the bottom of the chart for zooming
        start: 0, // Start position of the slider window
        end: 100, // End position of the slider window
        bottom: 2, // Position the slider at the bottom of the chart
      },
    ],
    xAxis: {
      type: "time", // X-axis representing dates
      name: "Date",
    },
    yAxis: {
      type: "value", // Y-axis representing numbers
      name: "total tweets",
    },
    legend: {
      data: ["Total Tweets"], // Add legend data
      textStyle: {
        fontSize: 12,
        fontWeight: "bold",
      },
    },
    series: [
      {
        data: dateBar.value, // Array of [date, number] pairs
        type: "line",
        name: "Total Tweets", // Assign a name to the series for the legend
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

const Bar: React.FC<MyComponentProps> = ({dataBar, functionDis}) => {
  const handleTooltipClick = (params: any) => {
    const xAxisValue = params.name; // Retrieve the xAxis value
    console.log("Tooltip clicked:", xAxisValue);
    functionDis(xAxisValue);
    // Call your desired function or perform any action here
  };
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chartRef.current &&
        !chartRef.current.contains(event.target as Node)
      ) {
        // User clicked outside the chart
        handleOutsideClick();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOutsideClick = () => {
    // Function to call when user clicks outside the chart
    console.log("User clicked outside the chart");
    functionDis("");
  };

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

  return (
    <div ref={chartRef}>
      <ReactECharts
        option={options}
        onEvents={{
          click: handleTooltipClick,
        }}
      />
    </div>
  );
};

const VisualizationPage: React.FC<MyComponentProps> = ({
  dataBar,
  word,
  dateBar,
  functionDis,
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
        <div>
          <Line
            dataBar={dataBar}
            word={[]}
            dateBar={dateBar}
            functionDis={() => {}}
          ></Line>
          <p style={{marginTop: "10px", marginLeft: "500px"}}>Date</p>
        </div>

        <Bar
          dataBar={dataBar}
          word={[]}
          dateBar={dateBar}
          functionDis={functionDis}
        ></Bar>
        <WordCloudCustom words={word} />
      </div>
    </div>
  );
};

export default VisualizationPage;
