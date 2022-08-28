import React from "react";
import { TableHeadType } from "./table.types";

const TableHead = ({ children }: TableHeadType) => {
  return (
    <thead className="table__head">
      <tr>{children}</tr>
    </thead>
  );
};

export default TableHead;
