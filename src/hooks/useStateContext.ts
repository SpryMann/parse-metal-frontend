import { useContext } from "react";
import { StateContext } from "src/store/stateContext/StateContext";

export const useStateContext = () => useContext(StateContext);
