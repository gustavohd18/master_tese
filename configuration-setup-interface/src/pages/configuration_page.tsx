import React, {useState} from "react";
import "../App.css";
import DataSourceSelector from "../components/DataSourceSelector";
import VisualizationToggler from "../components/VisualizationToggler";
import ProcessingFlinkToggler from "../components/ProcessingFlinkToggler";
import {Button} from "react-bootstrap";
import ButtonCustom from "../components/Button";

interface MyComponentProps {
  socket: WebSocket | null;
  setwordEntitedName: React.Dispatch<React.SetStateAction<string>>;
  wordEntitedName: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  tag: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setDataSource: React.Dispatch<React.SetStateAction<string>>;
  dataSource: string;
}

const ConfigurationPage: React.FC<MyComponentProps> = ({
  socket,
  setwordEntitedName,
  wordEntitedName,
  setTag,
  tag,
  setToken,
  token,
  setDataSource,
  dataSource,
}) => {
  const handleVisualizationToggle = (options: string[]) => {
    console.log(`User selected ${options}`);
  };

  const handleDataSourceSelect = (
    dataSource: string,
    barenToken: string,
    tag: string,
    wordEntitedName: string
  ) => {
    setDataSource(dataSource);
    setToken(barenToken);
    setTag(tag);
    setwordEntitedName(wordEntitedName);
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
          <div>Entered words to filter: {wordEntitedName}</div>
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
        <ButtonCustom
          onClick={() => {
            //mandar os dados para o server
            const data = {
              command: "setup",
              token: token,
              isEntitedNamed: wordEntitedName != null,
              entitedNamed: wordEntitedName.split(";"),
              tag: tag.split(";"),
            };

            if (socket != null) {
              socket.send(JSON.stringify(data));
            }
          }}
          title={"Start"}
        ></ButtonCustom>
        <ButtonCustom
          onClick={() => {
            //mandar os dados para o atualizar
            const data = {
              command: "update",
              token: token,
              isEntitedNamed: wordEntitedName != null,
              entitedNamed: wordEntitedName.split(";"),
              tag: tag.split(";"),
              filter: "",
            };
            if (socket != null) {
              socket.send(JSON.stringify(data));
            }
          }}
          title={"Update"}
        ></ButtonCustom>
      </div>
    </div>
  );
};

export default ConfigurationPage;
