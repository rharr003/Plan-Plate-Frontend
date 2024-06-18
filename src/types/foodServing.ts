import { FoodItem } from "./foodItem";

export type FoodServing = {
  id: number;
  serving_multiple: number;
  food_item: FoodItem;
};
