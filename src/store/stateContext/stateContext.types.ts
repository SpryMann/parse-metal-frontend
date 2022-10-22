import React from "react";
import { IUser } from "src/http/requests.types";
import { AdditionBarStateType } from "@features/ui/AdditionBar/additionBar.types";

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
  additionBarState: AdditionBarStateType;
  setAdditionBarState: React.Dispatch<
    React.SetStateAction<AdditionBarStateType>
  >;
};
