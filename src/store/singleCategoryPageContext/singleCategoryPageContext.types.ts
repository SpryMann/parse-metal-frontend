import { IProduct } from "src/features/products/productsTable/productsTable.types";
import React from "react";

export type SingleCategoryPageContextProviderProps = {
  children: React.ReactNode;
};

export type SingleCategoryPageContextType = {
  additionBarTitle: string;
  setAdditionBarTitle: React.Dispatch<React.SetStateAction<string>>;
  productFormMode: "create" | "edit";
  setProductFormMode: React.Dispatch<React.SetStateAction<"create" | "edit">>;
  selectedProduct: IProduct;
  setSelectedProduct: React.Dispatch<React.SetStateAction<IProduct>>;
};
