import React from "react";
import { HiMenu } from "react-icons/hi";
import { BsGearFill } from "react-icons/bs";
import "./Topbar.scss";
import { Button, Settings } from "src/features/ui";
import { useStateContext } from "src/hooks/useStateContext";

const Topbar = () => {
  const { isAuth, setIsActiveSidebar, setAdditionBarState } = useStateContext();

  const handleOpenSettings = () => {
    setAdditionBarState((prev) => ({
      ...prev,
      title: "Настройки",
      isEnable: true,
      content: <Settings />,
    }));
  };

  return (
    <div className="topbar">
      <Button
        className="btn topbar__btn"
        onClick={() => setIsActiveSidebar(true)}
      >
        <HiMenu />
      </Button>
      <h1 className="topbar__greeting">Добрый день!</h1>
      {isAuth && (
        <Button
          className="btn btn--text topbar__settings"
          onClick={handleOpenSettings}
        >
          <BsGearFill />
        </Button>
      )}
    </div>
  );
};

export default Topbar;
