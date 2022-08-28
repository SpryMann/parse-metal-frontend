import React from "react";
import { FormInputType } from "./form.types";

const FormInput = ({ value, type, placeholder, onChange }: FormInputType) => {
  return (
    <input
      className="form__input"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default FormInput;
