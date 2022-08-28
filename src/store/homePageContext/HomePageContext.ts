import { createContext } from "react";
import { HomePageContextType } from "./homePageContext.types";

export const HomePageContext = createContext<HomePageContextType>(
  {} as HomePageContextType
);
