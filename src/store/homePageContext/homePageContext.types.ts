import React from "react";
import { IExistedCategory } from "src/http/requests.types";

export type HomePageContextType = {
  isParsing: boolean;
  setIsParsing: React.Dispatch<React.SetStateAction<boolean>>;
  categoriesToParse: IExistedCategory[];
  setCategoriesToParse: React.Dispatch<
    React.SetStateAction<IExistedCategory[]>
  >;
};

export type HomePageContextProviderProps = {
  children: React.ReactNode;
};
