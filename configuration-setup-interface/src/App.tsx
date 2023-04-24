import React, {useState} from "react";
import "./App.css";
import ConfigurationPage from "./pages/configuration_page";
import VisualizationPage from "./pages/visualization_page";

function App() {
  const [activeTab, setActiveTab] = useState("page1");

  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName);
  };

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
      {activeTab === "page1" && <ConfigurationPage />}
      {activeTab === "page2" && <VisualizationPage />}
    </div>
  );
}

export default App;
