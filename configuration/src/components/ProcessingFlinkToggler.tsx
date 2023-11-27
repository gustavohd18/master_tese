import React, {useState} from "react";

interface ProcessingFlinkTogglerProps {
  onToggle?: (options: string[]) => void;
}

function ProcessingFlinkToggler(props: ProcessingFlinkTogglerProps) {
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
      <label>Select options Flink processing:</label>
      <br />
      <input
        type="checkbox"
        value="count words"
        checked={selectedOptions.includes("count words")}
        onChange={handleOptionToggle}
      />{" "}
      count words
      <br />
      <input
        type="checkbox"
        value="Named entity"
        checked={selectedOptions.includes("Named entity")}
        onChange={handleOptionToggle}
      />{" "}
      Named entity
      <br />
      <input
        type="checkbox"
        value="Count tweets pertime"
        checked={selectedOptions.includes("Count tweets per time")}
        onChange={handleOptionToggle}
      />{" "}
      Count tweets pertime
    </div>
  );
}

export default ProcessingFlinkToggler;
