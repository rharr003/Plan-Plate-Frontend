import signupFormData from "../../../types/signupFormData";

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

export type SignUpStage = keyof FormData;

export const initialFormData: FormData = {
  personal: {
    date_of_birth: {
      value: "",
      type: "date",
      error: "",
      label: "Date of birth:",
    },
  },
  physical: {
    heightFt: { value: 0, type: "number", error: "", label: "Height (feet):" },
    heightIn: {
      value: 0,
      type: "number",
      error: "",
      label: "Height (inches):",
    },
    weight: { value: 0, type: "number", error: "", label: "Weight (pounds):" },
  },
  credentials: {
    username: { value: "", type: "", error: "", label: "Username:" },
    password: { value: "", type: "password", error: "", label: "Password" },
    confirmPassword: {
      value: "",
      type: "password",
      error: "",
      label: "Confirm Password:",
    },
  },
};

export function mergeData(data: FormData): signupFormData {
  return Object.keys(data).reduce((acc, val) => {
    Object.keys(data[val]).forEach((key) => {
      acc = {
        ...acc,
        [key]: data[val][key].value,
      };
    });
    return acc;
  }, {}) as signupFormData;
}

export const initialSignUpStage: SignUpStage = "personal";
