import React from "react";
import Button from "react-bootstrap/Button";

type Props = {
  onClick: () => void;
  title: string;
};

const ButtonCustom: React.FC<Props> = ({onClick, title}) => {
  return (
    <Button className="button-custom" variant="primary" onClick={onClick}>
      {title}
    </Button>
  );
};

export default ButtonCustom;
