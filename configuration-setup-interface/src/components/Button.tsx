import React from "react";

type Props = {
  onClick: () => void;
  title: string;
};

const Button: React.FC<Props> = ({onClick, title}) => {
  return <button onClick={onClick}>{title}</button>;
};

export default Button;
