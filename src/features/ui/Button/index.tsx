import React from "react";
import { ButtonType } from "./button.types";

const Button = ({
  className,
  type = "button",
  children,
  onClick,
}: ButtonType) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
