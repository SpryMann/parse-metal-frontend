import React from "react";
import "./Main.scss";
import { MainType } from "./main.types";
import { Topbar } from "src/features/ui";

const Main = ({ children }: MainType) => {
  return (
    <main className="main">
      <Topbar />
      {children}
    </main>
  );
};

export default Main;
