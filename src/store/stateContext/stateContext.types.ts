import React from "react";
import { IUser } from "src/http/requests.types";

export type StateContextProviderProps = {
  children: React.ReactNode;
};

export type StateContextType = {
  isActiveSidebar: boolean;
  setIsActiveSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isActiveAdditionBar: boolean;
  setIsActiveAdditionBar: React.Dispatch<React.SetStateAction<boolean>>;
};
