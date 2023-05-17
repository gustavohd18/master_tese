import React, {useEffect, useState} from "react";
import "./App.css";
import {WordsCloud} from "./components/WordCloudCustom";
import ConfigurationPage from "./pages/configuration_page";
import VisualizationPage from "./pages/visualization_page";

type WebSocketMessageEvent = MessageEvent & {
  data: string;
};

export interface DataBarContent {
  lineX: string[];
  lineY: number[];
}

function App() {
  const [activeTab, setActiveTab] = useState("page1");
  const emptydataBar: DataBarContent = {
    lineX: [],
    lineY: [],
  };
  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName);
  };

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [dataBar, setDataBar] = useState<DataBarContent>(emptydataBar);
  const [wordCloud, setWordCloud] = useState<WordsCloud[]>([]);

  const newSocket = new WebSocket("ws://192.168.0.90:8080");

  useEffect(() => {
    newSocket.addEventListener("open", () => {
      console.log("WebSocket connection established.");
    });

    newSocket.addEventListener("message", (event: WebSocketMessageEvent) => {
      console.log("Received message:", event.data);
      //aqui conseguimos mapear
      const dataJson = JSON.parse(event.data);
      const dataFromEvent = dataJson["data"];

      if (dataJson["namedEntity"] == true) {
        //mandamos para o grafico de barras esse valor
        const dataBarContentFormat: DataBarContent = {
          lineX: dataFromEvent[0],
          lineY: dataFromEvent[1],
        };
        setDataBar(dataBarContentFormat);
      } else {
        //mapeamos aqui tanto para o de linhas quanto de wordcloud
        const wordContentFormat = dataFromEvent;
        setWordCloud(wordContentFormat);
      }
    });

    newSocket.addEventListener("close", () => {
      console.log("WebSocket connection closed.");
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  function handleSend() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send("Hello, server!");
    }
  }
  return (
    <div>
      <div className="tab">
        <button
          className={activeTab === "page1" ? "active" : ""}
          onClick={() => handleTabClick("page1")}
        >
          Setup
        </button>
        <button
          className={activeTab === "page2" ? "active" : ""}
          onClick={() => handleTabClick("page2")}
        >
          Visualization
        </button>
      </div>
      {activeTab === "page1" && <ConfigurationPage socket={newSocket} />}
      {activeTab === "page2" && (
        <VisualizationPage dataBar={dataBar} word={wordCloud} />
      )}
    </div>
  );
}

export default App;
