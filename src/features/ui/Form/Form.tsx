import React from "react";
import classNames from "classnames";
import "./Form.scss";
import { FormType } from "./form.types";

const Form = ({ className, children, onSubmit }: FormType) => {
  return (
    <form className={classNames("form", className)} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
