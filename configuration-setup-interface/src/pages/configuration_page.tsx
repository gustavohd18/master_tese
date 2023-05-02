import React, {useState} from "react";
import "../App.css";
import DataSourceSelector from "../components/DataSourceSelector";
import VisualizationToggler from "../components/VisualizationToggler";
import ProcessingFlinkToggler from "../components/ProcessingFlinkToggler";
import {Button} from "react-bootstrap";
import ButtonCustom from "../components/Button";

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
    <div>
      <div>
        <DataSourceSelector onSelect={handleDataSourceSelect} />
        <br />
        <div className="divider">
          <div>Selected data source: {dataSource}</div>
          <div>Entered token: {token}</div>
          <div>Entered tag: {tag}</div>
        </div>
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
        <ButtonCustom onClick={() => {}} title={"Start"}></ButtonCustom>
        <ButtonCustom onClick={() => {}} title={"Update"}></ButtonCustom>
      </div>
    </div>
  );
}

export default ConfigurationPage;
