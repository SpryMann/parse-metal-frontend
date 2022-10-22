import React from "react";
import { Main } from "src/features/ui";
import SingleCategoryPageContextProvider from "src/store/singleCategoryPageContext/SingleCategoryPageContextProvider";
import { ProductsByCategoryTable } from "src/features/products";

const SingleCategoryPage = () => {
  return (
    <SingleCategoryPageContextProvider>
      <Main>
        <ProductsByCategoryTable />
      </Main>
    </SingleCategoryPageContextProvider>
  );
};

export default SingleCategoryPage;
