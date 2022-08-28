import React from "react";
import "./Table.scss";
import { TableType } from "./table.types";

const Table = ({ children }: TableType) => {
  return <table className="table">{children}</table>;
};

export default Table;
