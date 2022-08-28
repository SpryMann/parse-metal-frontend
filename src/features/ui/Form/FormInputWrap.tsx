import React from "react";
import { FormInputWrapType } from "./form.types";

const FormInputWrap = ({ children }: FormInputWrapType) => {
  return <div className="form__input-wrap">{children}</div>;
};

export default FormInputWrap;
