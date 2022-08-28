import React from "react";
import { HiMenu } from "react-icons/hi";
import "./Topbar.scss";
import { Button } from "src/features/ui";
import { useStateContext } from "src/hooks/useStateContext";

const Topbar = () => {
  const { setIsActiveSidebar } = useStateContext();

  return (
    <div className="topbar">
      <Button
        className="btn topbar__btn"
        onClick={() => setIsActiveSidebar(true)}
      >
        <HiMenu />
      </Button>
      <h1 className="topbar__greeting">Добрый день!</h1>
    </div>
  );
};

export default Topbar;
