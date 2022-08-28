import React, { useState } from "react";
import { HomePageContextProviderProps } from "./homePageContext.types";
import { HomePageContext } from "./HomePageContext";
import { IExistedCategory } from "src/http/requests.types";

const HomePageContextProvider = ({
  children,
}: HomePageContextProviderProps) => {
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [categoriesToParse, setCategoriesToParse] = useState<
    IExistedCategory[]
  >([] as IExistedCategory[]);

  return (
    <HomePageContext.Provider
      value={{
        isParsing,
        setIsParsing,
        categoriesToParse,
        setCategoriesToParse,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};

export default HomePageContextProvider;
