import React, { HTMLInputTypeAttribute } from "react";

export type FormType = {
  className: string[];
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export type FormInputWrapType = {
  children: React.ReactNode;
};

export type FormInputType = {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type FormLabelType = {
  children: React.ReactNode;
};
