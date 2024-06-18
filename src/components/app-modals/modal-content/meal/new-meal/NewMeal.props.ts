import { FoodItem } from "../../../../../types/foodItem";
import { FoodServing } from "../../../../../types/foodServing";

export interface NewMealProps {
  selectedFoodItems: FoodItem[];
  createMeal: (mealName: string, servings: any[]) => void;
  mealId?: number;
  mealName?: string;
  isEditing: boolean;
  updateMeal: (
    mealName: string,
    oldServings: any[],
    newServings: any[]
  ) => void;
}
