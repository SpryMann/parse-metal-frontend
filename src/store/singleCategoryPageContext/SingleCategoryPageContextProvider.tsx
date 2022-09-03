import React, { useState } from "react";
import { SingleCategoryPageContext } from "./SingleCategoryPageContext";
import { SingleCategoryPageContextProviderProps } from "./singleCategoryPageContext.types";
import { IProduct } from "src/features/products/productsTable/productsTable.types";

const SingleCategoryPageContextProvider = ({
  children,
}: SingleCategoryPageContextProviderProps) => {
  const [additionBarTitle, setAdditionBarTitle] = useState<string>("");
  const [productFormMode, setProductFormMode] = useState<"create" | "edit">(
    "create"
  );
  const [selectedProduct, setSelectedProduct] = useState<IProduct>(
    {} as IProduct
  );

  return (
    <SingleCategoryPageContext.Provider
      value={{
        additionBarTitle,
        setAdditionBarTitle,
        productFormMode,
        setProductFormMode,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </SingleCategoryPageContext.Provider>
  );
};

export default SingleCategoryPageContextProvider;
