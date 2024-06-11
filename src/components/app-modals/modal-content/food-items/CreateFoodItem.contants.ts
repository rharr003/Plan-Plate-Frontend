import { FormData } from "../../../form/flexible-form/FlexibleForm.utils";
export interface CreateFoodItemFormData {
  name: string;
  base_serving_size: string;
  base_serving_size_unit: string;
  calories: number;
  fat: number;
  saturated_fat: number;
  carbohydrates: number;
  fiber: number;
  sugar: number;
  protein: number;
  sodium: number;
  potassium: number;
}

export const initialFormData: FormData = {
  main: {
    name: {
      value: "",
      type: "text",
      error: "",
      label: "Name:",
    },
    base_serving_size: {
      value: "",
      type: "number",
      error: "",
      label: "Base Serving Size:",
    },
    base_serving_size_unit: {
      value: "",
      type: "select",
      error: "",
      label: "Base Serving Size Unit:",
    },
    calories: {
      value: 0,
      type: "number",
      error: "",
      label: "Calories:",
    },
    fat: {
      value: 0,
      type: "number",
      error: "",
      label: "Fat (g):",
    },
    saturated_fat: {
      value: 0,
      type: "number",
      error: "",
      label: "Saturated Fat (g):",
    },
    carbohydrates: {
      value: 0,
      type: "number",
      error: "",
      label: "Carbohydrates (g):",
    },
    fiber: {
      value: 0,
      type: "number",
      error: "",
      label: "Fiber (g):",
    },
    sugar: {
      value: 0,
      type: "number",
      error: "",
      label: "Sugar (g):",
    },
    protein: {
      value: 0,
      type: "number",
      error: "",
      label: "Protein (g):",
    },
    sodium: {
      value: 0,
      type: "number",
      error: "",
      label: "Sodium (mg):",
    },
    potassium: {
      value: 0,
      type: "number",
      error: "",
      label: "Potassium (mg):",
    },
  },
};
