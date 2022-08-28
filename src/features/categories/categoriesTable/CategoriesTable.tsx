import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ICategory } from "./categoriesTable.types";
import RequestsService from "src/http/requests";

const columnHelper = createColumnHelper<ICategory>();
const columns = [
  columnHelper.accessor((row) => row.id, {
    id: "id",
    header: () => "Идентификатор",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.title, {
    id: "title",
    header: () => "Название",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.productsCount, {
    id: "productsCount",
    header: () => "Количество товаров",
    cell: (info) => info.getValue(),
  }),
];

const CategoriesTable = () => {
  const [data, setData] = useState<ICategory[]>([] as ICategory[]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const response = await RequestsService.getAllCategories();
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAllCategories();
  }, []);

  return (
    <div className="component">
      <h2 className="component__title">Категории</h2>

      <table className="table">
        <thead className="table__head">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="table__col" key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table__body">
          {table.getRowModel().rows.map((row) => (
            <tr className="table__row" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="table__col" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
