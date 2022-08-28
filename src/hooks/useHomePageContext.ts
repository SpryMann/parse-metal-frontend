import { useContext } from "react";
import { HomePageContext } from "src/store/homePageContext/HomePageContext";

export const useHomePageContext = () => useContext(HomePageContext);
