import { foodItem } from "../../../../../../types/food-item/foodItem";

export interface NewMealProps {
  selectedFoodItems: foodItem[];
  createMeal: (mealName: string, servings: any[]) => void;
  mealId?: number;
  mealName?: string;
}
