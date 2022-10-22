import React from "react";
import { FormInputNumberType } from "./form.types";

const FormInputNumber = ({
  value,
  min,
  max,
  onChange,
}: FormInputNumberType) => {
  return (
    <input
      className="form__input"
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
    />
  );
};

export default FormInputNumber;
