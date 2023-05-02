import React, {useState} from "react";
import "../App.css";

import ReactECharts from "echarts-for-react";
import ButtonCustom from "../components/Button";
import {Button} from "react-bootstrap";

const Page: React.FC = () => {
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
      <div className="button-starts">
        <Button variant="primary" onClick={() => {}} title={"Start"}></Button>
        <Button variant="primary" onClick={() => {}} title={"Update"}></Button>
      </div>
      <div>
        <Page></Page>
      </div>
    </div>
  );
}

export default VisualizationPage;
