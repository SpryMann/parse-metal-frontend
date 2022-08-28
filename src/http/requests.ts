import { ICategory } from "@features/categories/categoriesTable/categoriesTable.types";
import { IProduct } from "@features/products/productsTable/productsTable.types";
import { AxiosResponse } from "axios";
import $api from ".";
import {
  AuthResponse,
  IExistedCategory,
  IParserStatus,
} from "./requests.types";

export default class RequestsService {
  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/user/login", { username, password });
  }

  static async registration(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/user/registration", {
      username,
      password,
    });
  }

  static async logout(): Promise<void> {
    return $api.post("/user/logout");
  }

  static async getAllCategories(): Promise<AxiosResponse<ICategory[]>> {
    return $api.get<ICategory[]>("/category/retrieve");
  }

  static async updateCategories(): Promise<AxiosResponse<ICategory[]>> {
    return $api.get<ICategory[]>("/category/update");
  }

  static async getExistedCategories(): Promise<
    AxiosResponse<IExistedCategory[]>
  > {
    return $api.get<IExistedCategory[]>("/category/retrieve/existed");
  }

  static async getAllProducts(): Promise<AxiosResponse<IProduct[]>> {
    return $api.get<IProduct[]>("/product/retrieve");
  }

  static async uploadProducts(data: FormData): Promise<void> {
    return $api.post("/product/upload", data);
  }

  static async startParse(
    categoriesToParse: { id: number; name: string; percent: number }[]
  ): Promise<AxiosResponse<string>> {
    return $api.post<string>("/parser/start", {
      categories: categoriesToParse,
    });
  }

  static async getParseStatus(): Promise<AxiosResponse<IParserStatus>> {
    return $api.get<IParserStatus>("/parser/status");
  }
}
