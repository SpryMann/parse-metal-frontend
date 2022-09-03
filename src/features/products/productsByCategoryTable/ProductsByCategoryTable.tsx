import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import RequestsService from "src/http/requests";
import { IProduct } from "../productsTable/productsTable.types";
import { BsPlusLg } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import { Button } from "src/features/ui";
import { useStateContext } from "src/hooks/useStateContext";
import { useSingleCategoryPageContext } from "src/hooks/useSingleCategoryPageContext";

const ProductsByCategoryTable = () => {
  const params = useParams();
  const { isActiveAdditionBar, setIsActiveAdditionBar } = useStateContext();
  const {
    setAdditionBarTitle,
    setProductFormMode,
    selectedProduct,
    setSelectedProduct,
  } = useSingleCategoryPageContext();
  const [data, setData] = useState<IProduct[]>([] as IProduct[]);
  const newColumns = useMemo<ColumnDef<IProduct>[]>(
    () => [
      {
        id: "selection",
        header: () => "Выбор",
        cell: ({ row }) => (
          <input
            type="checkbox"
            value={row.original.id}
            checked={row.original.id === selectedProduct.id}
            onChange={() => handleSelection(row)}
          />
        ),
      },
      {
        accessorFn: (row) => row.id,
        id: "Id",
        header: () => "Идентификатор",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.title,
        id: "Title",
        header: () => "Название",
        cell: (info) => info.getValue(),
      },
    ],
    [selectedProduct.id]
  );
  const table = useReactTable({
    data,
    columns: newColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  function handleSelection(row: Row<IProduct>) {
    if (row.original.id === selectedProduct.id) {
      setSelectedProduct({} as IProduct);
    } else {
      setSelectedProduct(row.original);
    }
  }

  const handleClickCreate = () => {
    setAdditionBarTitle("Добавление товара");
    setProductFormMode("create");
    setIsActiveAdditionBar(true);
  };

  const handleClickEdit = () => {
    setAdditionBarTitle("Редактирование товара");
    setProductFormMode("edit");
    setIsActiveAdditionBar(true);
  };

  const handleClickDelete = async () => {
    try {
      await RequestsService.deleteProduct(selectedProduct.id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchProductsByCategory() {
      try {
        if (params.id) {
          const response = await RequestsService.getProductsByCategory(
            parseInt(params.id)
          );
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchProductsByCategory();
  }, []);

  return (
    <div className="component">
      <h2 className="component__title">Товары</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Button
          className={classNames("btn", {
            "btn--disabled": isActiveAdditionBar,
          })}
          onClick={handleClickCreate}
        >
          <BsPlusLg />
        </Button>
        <Button
          className={classNames("btn", {
            "btn--disabled":
              !selectedProduct.hasOwnProperty("id") || isActiveAdditionBar,
          })}
          onClick={handleClickEdit}
        >
          <MdEdit />
        </Button>
        <Button
          className={classNames("btn", {
            "btn--disabled":
              !selectedProduct.hasOwnProperty("id") || isActiveAdditionBar,
          })}
          onClick={handleClickDelete}
        >
          <MdDelete />
        </Button>
      </div>
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

export default ProductsByCategoryTable;
