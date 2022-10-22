import React from "react";
import { FormInputCheckboxType } from "./form.types";

const FormInputCheckbox = ({ checked, setChecked }: FormInputCheckboxType) => {
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <input
        className="form__input"
        id="autoParsing"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <label
        className="form__label form__label--check"
        htmlFor="autoParsing"
      ></label>
    </>
  );
};

export default FormInputCheckbox;
