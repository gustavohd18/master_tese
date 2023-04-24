import React, {useState} from "react";
import "../App.css";
import DataSourceSelector from "../components/DataSourceSelector";
import VisualizationToggler from "../components/VisualizationToggler";
import ProcessingFlinkToggler from "../components/ProcessingFlinkToggler";
import Button from "../components/Button";

function ConfigurationPage() {
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
        <DataSourceSelector onSelect={handleDataSourceSelect} />
        <br />
        <div>Selected data source: {dataSource}</div>
        <br />
        <div>Entered token: {token}</div>
        <div>Entered tag: {tag}</div>
      </div>
      <div className="container">
        <div className="left">
          <VisualizationToggler onToggle={handleVisualizationToggle} />
        </div>
        <div className="right">
          <ProcessingFlinkToggler
            onToggle={handleVisualizationToggle}
          ></ProcessingFlinkToggler>
        </div>
      </div>
      <div className="button-starts">
        <Button onClick={() => {}} title={"Start"}></Button>
        <Button onClick={() => {}} title={"Update"}></Button>
      </div>
    </div>
  );
}

export default ConfigurationPage;
