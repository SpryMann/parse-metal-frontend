import classNames from "classnames";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "src/features/ui";
import { AdditionBarProps } from "./additionBar.types";
import { useStateContext } from "src/hooks/useStateContext";
import { useSingleCategoryPageContext } from "src/hooks/useSingleCategoryPageContext";
import "./AdditionBar.scss";
import { IProduct } from "src/features/products/productsTable/productsTable.types";

const AdditionBar = ({ className, children }: AdditionBarProps) => {
  const { setIsActiveAdditionBar } = useStateContext();
  const { additionBarTitle, setAdditionBarTitle, setSelectedProduct } =
    useSingleCategoryPageContext();

  const handleClose = () => {
    setAdditionBarTitle("");
    setIsActiveAdditionBar(false);
    setSelectedProduct({} as IProduct);
  };

  return (
    <div className={classNames("addition-bar", className)}>
      <div className="addition-bar__header">
        <Button className={classNames("btn")} onClick={handleClose}>
          <BsArrowLeft />
        </Button>
        {!!additionBarTitle && (
          <h2 className="addition-bar__title">{additionBarTitle}</h2>
        )}
      </div>
      {children}
    </div>
  );
};

export default AdditionBar;
