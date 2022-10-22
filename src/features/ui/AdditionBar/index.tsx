import React from "react";
import classNames from "classnames";
import { BsArrowLeft } from "react-icons/bs";
import Button from "../Button";
import "./AdditionBar.scss";
import { useStateContext } from "src/hooks/useStateContext";

const AdditionBar = () => {
  const { additionBarState, setAdditionBarState } = useStateContext();

  const handleClose = () => {
    setAdditionBarState((prev) => ({ ...prev, isEnable: false, title: "" }));
  };

  return (
    <div
      className={classNames("addition-bar", {
        "addition-bar--active": additionBarState.isEnable,
      })}
    >
      <div className="addition-bar__header">
        <Button className="btn" onClick={handleClose}>
          <BsArrowLeft />
        </Button>
        {!!additionBarState.title && (
          <h2 className="addition-bar__title">{additionBarState.title}</h2>
        )}
      </div>
      {additionBarState.content}
    </div>
  );
};

export default AdditionBar;
