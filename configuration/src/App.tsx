import React, {useEffect, useState} from "react";
import "./App.css";
import {WordsCloud} from "./components/WordCloudCustom";
import ConfigurationPage from "./pages/configuration_page";
import VisualizationPage from "./pages/visualization_page";
function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

type WebSocketMessageEvent = MessageEvent & {
  data: string;
};

export interface DataBarContent {
  lineX: string[];
  lineY: number[];
}

export interface DateContent {
  value: any[];
}

function App() {
  const [activeTab, setActiveTab] = useState("page1");
  const emptydataBar: DataBarContent = {
    lineX: [],
    lineY: [],
  };

  const emptydateBar: DateContent = {
    value: [],
  };
  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName);
  };

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [dataBar, setDataBar] = useState<DataBarContent>(emptydataBar);
  const [dateBar, setDateBar] = useState<DateContent>(emptydateBar);
  const [valueFilter, setValueFilter] = useState<string>("");
  const [phases, setValuePhases] = useState([""]);
  var previousValue = "";
  const [wordCloud, setWordCloud] = useState<WordsCloud[]>([]);
  const [dataSource, setDataSource] = useState("");
  const [token, setToken] = useState("");
  const [tag, setTag] = useState("");
  const [wordEntitedName, setwordEntitedName] = useState("");

  function setValues(text: string) {
    setValueFilter(text);
    if (socket != null) {
      const data = {
        command: "update",
        filter: text,
        token: token,
        isEntitedNamed: wordEntitedName != null,
        entitedNamed: wordEntitedName.split(";"),
        tag: tag.split(";"),
      };
      if (socket != null) {
        socket.send(JSON.stringify(data));
      }
      //  gdfg;
      // const obj = {messages: "filter", filter: text};
      // const jsonString = JSON.stringify(obj);
      //  socket.send(jsonString);
    }
  }

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8092");

    newSocket.addEventListener("open", () => {
      console.log("WebSocket connection established.");
    });

    newSocket.addEventListener("message", (event: WebSocketMessageEvent) => {
        console.log("Received message:", event.data);
      //aqui conseguimos mapear
      const dataJson = JSON.parse(event.data);
      const dataFromEvent = dataJson["data"];

      if (dataJson["phases"] == true) {
        setValuePhases(dataFromEvent);
      } else {
        if (dataJson["namedEntity"] == true) {
          // console.log(dataJson);

          if (dataJson["isDate"] == true) {
            // console.log(event.data);
            //console.log(dataFromEvent);
            //console.log(dataFromEvent[0].length);
            //console.log(dataFromEvent[1].length);
            const dataBarContentFormat: DateContent = {
              value: dataFromEvent,
            };
            setDateBar(dataBarContentFormat);
          } else {
            //mandamos para o grafico de barras esse valor
            const dataBarContentFormat: DataBarContent = {
              lineX: dataFromEvent[0],
              lineY: dataFromEvent[1],
            };
            setDataBar(dataBarContentFormat);
          }
        } else {
          // console.log(dataJson);

          if (dataJson["isDate"] == true) {
            const dataBarContentFormat: DateContent = {
              value: dataFromEvent,
            };
            setDateBar(dataBarContentFormat);
          } else {
            previousValue;
            if (valueFilter != "") {
              //aqui vamos mandar a mensagem para manipular os dados no lado do server/kafka
              // caso seja em branco coloca toda a wordcloud
              // caso nao seja branco realiza o filtro
              const array = shuffleArray(dataFromEvent);
              // Select the first 100 elements
              const selectedElements = array.slice(0, 25);
              setWordCloud(selectedElements);
            } else {
              // caso seja em branco coloca toda a wordcloud
              const wordContentFormat = dataFromEvent;
              setWordCloud(wordContentFormat);
            }

            //mapeamos aqui tanto para o de linhas quanto de wordcloud
          }
        }
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
      {activeTab === "page1" && (
        <ConfigurationPage
          socket={socket}
          setDataSource={setDataSource}
          dataSource={dataSource}
          tag={tag}
          setTag={setTag}
          token={token}
          setToken={setToken}
          wordEntitedName={wordEntitedName}
          setwordEntitedName={setwordEntitedName}
        />
      )}
      {activeTab === "page2" && (
        <VisualizationPage
          dataBar={dataBar}
          word={wordCloud}
          dateBar={dateBar}
          functionDis={setValues}
          textWord={valueFilter}
          phases={phases}
        />
      )}
    </div>
  );
}

export default App;
