import React, {useState} from "react";
import "../App.css";

import Button from "../components/Button";

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
        <Button onClick={() => {}} title={"Start"}></Button>
        <Button onClick={() => {}} title={"Update"}></Button>
      </div>
    </div>
  );
}

export default VisualizationPage;
