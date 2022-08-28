import React from "react";

export type ProductsTableHeadDataItemType = {
  id: number;
  name: React.ReactNode;
};

export type ProductsTableRowDataType = {
  id: number;
  disabled: boolean;
  items: ProductsTableDataItemType[];
};

export type ProductsTableDataItemType = {
  id: number;
  content: React.ReactNode;
};

export interface IProduct {
  id: number;
  title: string;
  link: string;
  targetLink: string;
  price: number;
  categoryId: number;
}
