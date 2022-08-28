import React from "react";
import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { MdOutlineLogout } from "react-icons/md";
import "./Sidebar.scss";
import Logo from "src/images/big-logo.svg";
import { Button } from "src/features/ui";
import { sidebarData } from "./sidebar.data";
import { useStateContext } from "src/hooks/useStateContext";
import RequestsService from "src/http/requests";
import { IUser } from "src/http/requests.types";

const Sidebar = () => {
  const { isActiveSidebar, setIsActiveSidebar, isAuth, setIsAuth, setUser } =
    useStateContext();

  const handleLogout = async () => {
    try {
      await RequestsService.logout();
      localStorage.removeItem("token");
      setUser({} as IUser);
      setIsAuth(false);
      setIsActiveSidebar(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={classNames("sidebar", { "sidebar--active": isActiveSidebar })}
    >
      <div className="sidebar__header">
        <Link
          className="sidebar__logo-wrap"
          to="/"
          onClick={() => setIsActiveSidebar(false)}
        >
          <img className="logo sidebar__logo" src={Logo} alt="Metallboss" />
        </Link>
        <Button
          className="btn sidebar__close"
          onClick={() => setIsActiveSidebar(false)}
        >
          <TbLayoutSidebarLeftCollapse />
        </Button>
      </div>
      <ul className="sidebar__menu menu">
        {sidebarData.map((item) => (
          <li className="menu__item" key={item.id}>
            <NavLink
              to={item.endpoint}
              className={({ isActive }) =>
                classNames("menu__link", { "menu__link--active": isActive })
              }
              onClick={() => setIsActiveSidebar(false)}
            >
              {item.icon}
              <span className="menu__point">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      {isAuth && (
        <Button
          className="btn btn--with-text sidebar__btn sidebar__btn--with-text"
          onClick={handleLogout}
        >
          <span className="btn__text">Выйти</span>
          <MdOutlineLogout />
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
