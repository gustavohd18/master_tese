import React, {useState} from "react";

interface DataSourceSelectorProps {
  onSelect: (dataSource: string, token: string, tag: string) => void;
}

function DataSourceSelector(props: DataSourceSelectorProps) {
  const [dataSource, setDataSource] = useState("twitter");
  const [token, setToken] = useState("");
  const [tag, setTag] = useState("");

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSelect(dataSource, token, tag);
  };

  return (
    <div>
      <label>Select data source:</label>
      <br />
      <select value={dataSource} onChange={handleDataSourceChange}>
        <option value="twitter">Twitter</option>
        <option value="youtube">YouTube</option>
      </select>
      <br />
      <form onSubmit={handleSubmit}>
        <label>Baren token:</label>
        <br />
        <input type="text" value={token} onChange={handleTokenChange} />
        <br />
        <label>Tags:</label>
        <br />
        <input type="text" value={tag} onChange={handleTagChange} />
        <br />
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default DataSourceSelector;
