import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { BsPlusLg } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import RequestsService from "src/http/requests";
import { IProduct } from "../productsTable/productsTable.types";
import { Button } from "src/features/ui";
import { ProductForm } from "../productForm";
import { useStateContext } from "src/hooks/useStateContext";
import { useSingleCategoryPageContext } from "src/hooks/useSingleCategoryPageContext";

const ProductsByCategoryTable = () => {
  const params = useParams();
  const { additionBarState, setAdditionBarState } = useStateContext();
  const { setProductFormMode, selectedProduct, setSelectedProduct } =
    useSingleCategoryPageContext();
  const [data, setData] = useState<IProduct[]>([] as IProduct[]);

  const columnHelper = createColumnHelper<IProduct>();
  const columns = [
    columnHelper.display({
      id: "Selection",
      header: () => "Выбор",
      cell: ({ row }) => (
        <input
          type="checkbox"
          value={row.original.id}
          checked={row.original.id === selectedProduct.id}
          onChange={() => handleSelection(row)}
        />
      ),
    }),
    columnHelper.accessor((row) => row.title, {
      id: "Title",
      header: () => "Название",
      cell: (info) => (
        <a
          href={info.row.original.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor((row) => row.targetLink, {
      id: "Target",
      header: () => "Ссылка на оригинал",
      cell: (info) => (
        <a
          href={info.row.original.targetLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ссылка на оригинал
        </a>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
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
    setProductFormMode("create");
    setAdditionBarState((prev) => ({
      ...prev,
      title: "Добавление товара",
      isEnable: true,
      content: <ProductForm />,
    }));
  };

  const handleClickEdit = () => {
    setProductFormMode("edit");
    setAdditionBarState((prev) => ({
      ...prev,
      title: "Редактирование товара",
      isEnable: true,
      content: <ProductForm />,
    }));
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
    let isSubscribed = true;

    async function fetchProductsByCategory() {
      try {
        if (params.id) {
          const response = await RequestsService.getProductsByCategory(
            parseInt(params.id)
          );

          return response.data;
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchProductsByCategory().then((data) => {
      if (isSubscribed && data) {
        setData(data);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [params.id]);

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
            "btn--disabled": additionBarState.isEnable,
          })}
          onClick={handleClickCreate}
        >
          <BsPlusLg />
        </Button>
        <Button
          className={classNames("btn", {
            "btn--disabled":
              !selectedProduct.hasOwnProperty("id") ||
              additionBarState.isEnable,
          })}
          onClick={handleClickEdit}
        >
          <MdEdit />
        </Button>
        <Button
          className={classNames("btn", {
            "btn--disabled":
              !selectedProduct.hasOwnProperty("id") ||
              additionBarState.isEnable,
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
