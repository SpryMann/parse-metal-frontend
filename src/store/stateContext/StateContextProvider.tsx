import { useState } from "react";
import { IUser } from "src/http/requests.types";
import { StateContext } from "./StateContext";
import { StateContextProviderProps } from "./stateContext.types";

const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [isActiveSidebar, setIsActiveSidebar] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({} as IUser);

  return (
    <StateContext.Provider
      value={{
        isActiveSidebar,
        setIsActiveSidebar,
        isAuth,
        setIsAuth,
        user,
        setUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
