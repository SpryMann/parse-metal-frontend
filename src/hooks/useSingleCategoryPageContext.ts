import { useContext } from "react";
import { SingleCategoryPageContext } from "src/store/singleCategoryPageContext/SingleCategoryPageContext";

export const useSingleCategoryPageContext = () =>
  useContext(SingleCategoryPageContext);
