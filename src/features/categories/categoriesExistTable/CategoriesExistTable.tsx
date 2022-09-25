import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, IndeterminateCheckbox } from "src/features/ui";
import classNames from "classnames";
import { useHomePageContext } from "src/hooks/useHomePageContext";
import RequestsService from "src/http/requests";
import { IExistedCategory } from "src/http/requests.types";

const defaultColumn: Partial<ColumnDef<IExistedCategory>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(initialValue);
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        type="text"
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

const CategoriesExistTable = () => {
  const { isParsing, setIsParsing, setCategoriesToParse } =
    useHomePageContext();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<IExistedCategory[]>(
    [] as IExistedCategory[]
  );
  const columns = useMemo<ColumnDef<IExistedCategory>[]>(
    () => [
      {
        id: "selection",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        accessorFn: (row) => row.id,
        id: "id",
        header: () => "Идентификатор",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.title,
        id: "name",
        header: () => "Название",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.productsCount,
        id: "count",
        header: () => "Количество товаров",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.percent,
        id: "percent",
        header: () => "Процент",
        // cell: (info) => info.getValue(),
      },
    ],
    []
  );
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }

            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  const handleStartParsing = () => {
    setIsParsing(true);
    setCategoriesToParse(
      table.getSelectedRowModel().flatRows.map((row) => row.original)
    );
    table.toggleAllRowsSelected();
  };

  const handleUpdateExisted = async () => {
    try {
      setIsUpdating(true);
      await RequestsService.updateExisted(
        table.getRowModel().flatRows.map((row) => ({
          id: row.original.id,
          name: row.original.title,
          percent: row.original.percent,
        }))
      );
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    async function fetchExistedCategories() {
      try {
        const response = await RequestsService.getExistedCategories();
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchExistedCategories();
  }, []);

  return (
    <div className="component">
      <h2 className="component__title">Категории</h2>
      <Button
        className={classNames("btn", "btn--text", "component__btn", {
          "btn--disabled":
            !table.getSelectedRowModel().flatRows.length || isParsing,
        })}
        onClick={handleStartParsing}
      >
        <span className="btn__text">Начать парсинг</span>
      </Button>
      <Button
        className={classNames("btn", "btn--text", "component__btn", {
          "btn--disabled": isUpdating || isParsing,
        })}
        onClick={handleUpdateExisted}
      >
        <span className="btn__text">Сохранить</span>
      </Button>
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
      <button
        type="button"
        onClick={() => table && table.getSelectedRowModel()}
      ></button>
    </div>
  );
};

export default CategoriesExistTable;
