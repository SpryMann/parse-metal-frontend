import { ICategory } from "@features/categories/categoriesTable/categoriesTable.types";

export interface IUser {
  id: string;
  username: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IExistedCategory extends ICategory {
  percent: number;
}

export interface IParserStatus {
  isRunning: boolean;
  completed: boolean;
  errors: string[];
  logs: {
    categoryName: string;
    completed: boolean;
    success: boolean;
  }[];
  lastParsingDate: number;
}
