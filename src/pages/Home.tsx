import React from "react";
import { Main } from "src/features/ui";
import { CategoriesExistTable } from "src/features/categories";
import { ProductsUpload } from "src/features/products";
import { ParserController } from "src/features/parser";
import HomePageContextProvider from "src/store/homePageContext/HomePageContextProvider";

const Home = () => {
  return (
    <HomePageContextProvider>
      <Main>
        <div className="main__content">
          <div className="main__col main__col--big">
            <CategoriesExistTable />
          </div>
          <div className="main__col main__col--small">
            <ParserController />
            <ProductsUpload />
          </div>
        </div>
      </Main>
    </HomePageContextProvider>
  );
};

export default Home;
