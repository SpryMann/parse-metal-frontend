import React from "react";
import { TableBodyType } from "./table.types";

const TableBody = ({ children }: TableBodyType) => {
  return <tbody className="table__body">{children}</tbody>;
};

export default TableBody;
