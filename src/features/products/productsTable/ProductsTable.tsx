import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import RequestsService from "src/http/requests";
import { IProduct } from "./productsTable.types";

const columnHelper = createColumnHelper<IProduct>();
const columns = [
  columnHelper.accessor((row) => row.id, {
    id: "id",
    header: () => "Идентификатор",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.title, {
    id: "title",
    header: () => "Название",
    cell: (info) => <a href={info.row.original.link}>{info.getValue()}</a>,
  }),
  columnHelper.accessor((row) => row.price, {
    id: "price",
    header: () => "Цена",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.categoryId, {
    id: "categoryId",
    header: () => "Номер категории",
    cell: (info) => info.getValue(),
  }),
];

const ProductsTable = () => {
  const [data, setData] = useState<IProduct[]>([] as IProduct[]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await RequestsService.getAllProducts();
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="component">
      <h2 className="component__title">Товары</h2>
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
          {table.getCoreRowModel().rows.map((row) => (
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

export default ProductsTable;
