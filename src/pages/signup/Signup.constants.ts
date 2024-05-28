import {
  FormData,
  Section,
} from "../../components/form/flexible-form/FlexibleForm.utils";

export const IMAGE_ALT = "people working";
export const HEADING1 = "Welcome";
export const HEADING2 = "let's get started.";
export const SUBHEADING = "Plan-Plate Signup:";

export interface signupFormData {
  username: string;
  password: string;
  date_of_birth: string;
  heightFt: number;
  heightIn: number;
  weight: number;
}

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

export function mergeData(data: FormData) {
  return Object.keys(data).reduce((acc, val) => {
    Object.keys(data[val]).forEach((key) => {
      acc = {
        ...acc,
        [key]: data[val][key].value,
      };
    });
    return acc;
  }, {});
}

export const initialSection: Section = "personal";
