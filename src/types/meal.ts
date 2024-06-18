import { FoodItem } from "./foodItem";
import { FoodServing } from "./foodServing";

export type Meal = {
  id: number;
  name: string;
  type: string;
  food_servings: FoodServing[];
};
