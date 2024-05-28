import {
  FormData,
  Section,
} from "../../components/form/flexible-form/FlexibleForm.utils";

export const IMAGE_ALT = "Healthy Food on Plate";
export const HEADING1 = "Diet Planning";
export const HEADING2 = "made easy.";
export const SUBHEADING = "Plan-Plate Login:";

export interface LoginFormData {
  username: string;
  password: string;
}

export const initialFormData: FormData = {
  credentials: {
    username: { value: "", type: "", error: "", label: "Username:" },
    password: { value: "", type: "password", error: "", label: "Password:" },
  },
};

export const initialSection: Section = "credentials";
