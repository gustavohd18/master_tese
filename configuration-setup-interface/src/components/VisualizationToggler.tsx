import React, {useState} from "react";

interface VisualizationTogglerProps {
  onToggle?: (options: string[]) => void;
}

function VisualizationToggler(props: VisualizationTogglerProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      const updatedOptions = selectedOptions.filter((o) => o !== option);
      setSelectedOptions(updatedOptions);
    } else {
      const updatedOptions = [...selectedOptions, option];
      setSelectedOptions(updatedOptions);
    }

    if (props.onToggle) {
      props.onToggle(selectedOptions);
    }
  };

  return (
    <div>
      <label>Select visualization:</label>
      <br />
      <input
        type="checkbox"
        value="bar"
        checked={selectedOptions.includes("bar")}
        onChange={handleOptionToggle}
      />{" "}
      Bar
      <br />
      <input
        type="checkbox"
        value="word-cloud"
        checked={selectedOptions.includes("word-cloud")}
        onChange={handleOptionToggle}
      />{" "}
      Word Cloud
      <br />
      <input
        type="checkbox"
        value="line"
        checked={selectedOptions.includes("line")}
        onChange={handleOptionToggle}
      />{" "}
      Line
    </div>
  );
}

export default VisualizationToggler;
