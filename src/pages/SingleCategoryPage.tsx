import React from "react";
import classNames from "classnames";
import { useStateContext } from "src/hooks/useStateContext";
import { AdditionBar, Main } from "src/features/ui";
import SingleCategoryPageContextProvider from "src/store/singleCategoryPageContext/SingleCategoryPageContextProvider";
import { ProductsByCategoryTable, ProductForm } from "src/features/products";

const SingleCategoryPage = () => {
  const { isActiveAdditionBar } = useStateContext();

  return (
    <SingleCategoryPageContextProvider>
      <Main>
        <ProductsByCategoryTable />
      </Main>
      <AdditionBar
        className={classNames({ "addition-bar--active": isActiveAdditionBar })}
      >
        <ProductForm />
      </AdditionBar>
    </SingleCategoryPageContextProvider>
  );
};

export default SingleCategoryPage;
