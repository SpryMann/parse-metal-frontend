import { createContext } from "react";
import { SingleCategoryPageContextType } from "./singleCategoryPageContext.types";

export const SingleCategoryPageContext = createContext(
  {} as SingleCategoryPageContextType
);
