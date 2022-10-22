import React from "react";
import "./Main.scss";
import { MainType } from "./main.types";
import { AdditionBar, Topbar } from "src/features/ui";

const Main = ({ children }: MainType) => {
  return (
    <main className="main">
      <Topbar />
      <AdditionBar />
      {children}
    </main>
  );
};

export default Main;
