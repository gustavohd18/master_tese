import React, {useState} from "react";
import {Button} from "react-bootstrap";

interface DataSourceSelectorProps {
  onSelect: (
    dataSource: string,
    token: string,
    tag: string,
    setwordEntitedName: string
  ) => void;
}

function DataSourceSelector(props: DataSourceSelectorProps) {
  const [dataSource, setDataSource] = useState("twitter");
  const [token, setToken] = useState("");
  const [tag, setTag] = useState("");
  const [wordEntitedName, setwordEntitedName] = useState("");

  const handleDataSourceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDataSource(event.target.value);
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  const handleWordEntitedName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setwordEntitedName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSelect(dataSource, token, tag, wordEntitedName);
  };

  return (
    <div className="data-source">
      <label>Select data source:</label>
      <br />
      <select value={dataSource} onChange={handleDataSourceChange}>
        <option value="twitter">Twitter</option>
        <option value="youtube">YouTube</option>
      </select>
      <br />
      <form onSubmit={handleSubmit}>
        <label style={{marginTop: "8px"}}>Baren token:</label>
        <br />

        <input type="text" value={token} onChange={handleTokenChange} />
        <br />
        <label style={{marginTop: "8px"}}>Tags:</label>
        <br />
        <input type="text" value={tag} onChange={handleTagChange} />
        <br />
        <label style={{marginTop: "8px"}}>Words to count:</label>
        <br />
        <input
          type="text"
          value={wordEntitedName}
          onChange={handleWordEntitedName}
        />
        <br />
        <Button style={{marginTop: "8px"}} variant="primary" type="submit">
          save
        </Button>
      </form>
    </div>
  );
}

export default DataSourceSelector;
