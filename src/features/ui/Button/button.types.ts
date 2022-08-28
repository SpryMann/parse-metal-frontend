import React from "react";

export type ButtonType = {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
  type?: "button" | "submit" | "reset" | undefined;
};
