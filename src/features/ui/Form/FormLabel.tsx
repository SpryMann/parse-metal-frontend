import React from "react";
import { FormLabelType } from "./form.types";

const FormLabel = ({ children }: FormLabelType) => {
  return <label className="form__label">{children}</label>;
};

export default FormLabel;
