import React from "react";
import { TableRowItemType } from "./table.types";

const TableRowItem = ({ children }: TableRowItemType) => {
  return <td className="table__col">{children}</td>;
};

export default TableRowItem;
