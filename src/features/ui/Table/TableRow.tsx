import React from "react";
import classNames from "classnames";
import { TableRowType } from "./table.types";

const TableRow = ({ disabled, children }: TableRowType) => {
  return (
    <tr
      className={classNames("table__row", { "table__row--disabled": disabled })}
    >
      {children}
    </tr>
  );
};

export default TableRow;
