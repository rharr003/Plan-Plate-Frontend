import React, { useState } from "react";

interface FormValue {
  value: string | number;
  type: string;
  error: string;
  label: string;
}

export interface FormData {
  [key: string]: {
    [key: string]: FormValue;
  };
}

type FormHookReturn = [
  FormData,
  (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    formStage: keyof FormData
  ) => void,
  (formStage: keyof FormData) => boolean,
  (fields: string[], section: string, message: string) => void
];

export default function useForm(initialValues: FormData): FormHookReturn {
  const [data, setData] = useState(initialValues);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    formStage: keyof FormData
  ) {
    const { name, value } = e.target;
    const newValue = parseFloat(value);
    setData((data) => ({
      ...data,
      [formStage]: {
        ...data[formStage],
        [name]: {
          ...data[formStage][name],
          value: newValue || value,
        },
      },
    }));
  }

  function isValid(formStage: keyof FormData) {
    return Object.values(data[formStage]).every(
      (val) => val.value !== "" && val.error === ""
    );
  }

  function setErrors(fields: string[], section: string, message: string) {
    const updatedSection = {
      ...data[section],
    };
    fields.forEach((field) => {
      updatedSection[field].error = message;
    });
    setData((data) => ({
      ...data,
      [section]: updatedSection,
    }));
  }

  return [data, handleChange, isValid, setErrors];
}
