import React, {useState} from "react";

export interface MyComponentPhaseProps {
  phases: string[];
}
const PhaseBox: React.FC<MyComponentPhaseProps> = ({phases}) => {
  return (
    <div>
      <div
        style={{
          width: "300px",
          height: "300px",
          border: "1px solid black",
          overflow: "auto",
        }}
      >
        <ul>
          {phases.map((phase, index) => (
            <li key={index}>{phase}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PhaseBox;
