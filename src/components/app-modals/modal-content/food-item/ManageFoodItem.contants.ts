import { FoodItem } from "../../../../types/foodItem";
import { FormData } from "../../../form/flexible-form/FlexibleForm.utils";
export interface CreateFoodItemFormData {
  food_item_id?: number;
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

export function prePopulatedFormData(foodItem: FoodItem) {
  return {
    main: {
      name: {
        value: foodItem.name,
        type: "text",
        error: "",
        label: "Name:",
      },
      base_serving_size: {
        value: foodItem.base_serving_size,
        type: "number",
        error: "",
        label: "Base Serving Size:",
      },
      base_serving_size_unit: {
        value: foodItem.base_serving_size_unit,
        type: "select",
        error: "",
        label: "Base Serving Size Unit:",
      },
      calories: {
        value: foodItem.calories,
        type: "number",
        error: "",
        label: "Calories:",
      },
      fat: {
        value: foodItem.fat,
        type: "number",
        error: "",
        label: "Fat (g):",
      },
      saturated_fat: {
        value: foodItem.saturated_fat,
        type: "number",
        error: "",
        label: "Saturated Fat (g):",
      },
      carbohydrates: {
        value: foodItem.carbohydrates,
        type: "number",
        error: "",
        label: "Carbohydrates (g):",
      },
      fiber: {
        value: foodItem.fiber,
        type: "number",
        error: "",
        label: "Fiber (g):",
      },
      sugar: {
        value: foodItem.sugar,
        type: "number",
        error: "",
        label: "Sugar (g):",
      },
      protein: {
        value: foodItem.protein,
        type: "number",
        error: "",
        label: "Protein (g):",
      },
      sodium: {
        value: foodItem.sodium,
        type: "number",
        error: "",
        label: "Sodium (mg):",
      },
      potassium: {
        value: foodItem.potassium,
        type: "number",
        error: "",
        label: "Potassium (mg):",
      },
    },
  };
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
      value: "g",
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
