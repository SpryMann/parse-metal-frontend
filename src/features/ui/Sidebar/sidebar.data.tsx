import { BsFillHouseDoorFill, BsGiftFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";

export const sidebarData = [
  {
    id: 1,
    name: "Главная",
    endpoint: "/",
    icon: <BsFillHouseDoorFill />,
  },
  {
    id: 2,
    name: "Категории",
    endpoint: "/categories",
    icon: <BiCategory />,
  },
  {
    id: 3,
    name: "Продукты",
    endpoint: "/products",
    icon: <BsGiftFill />,
  },
];
