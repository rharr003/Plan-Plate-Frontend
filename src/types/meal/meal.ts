import { foodItem } from "../food-item/foodItem";

export type Meal = {
  id: number;
  name: string;
  type: string;
  food_servings: {
    id: number;
    serving_multiple: number;
    food_item: foodItem;
  }[];
};
