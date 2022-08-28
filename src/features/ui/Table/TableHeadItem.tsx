import React from "react";
import { TableHeadItemType } from "./table.types";

const TableHeadItem = ({ children }: TableHeadItemType) => {
  return <th className="table__col">{children}</th>;
};

export default TableHeadItem;
