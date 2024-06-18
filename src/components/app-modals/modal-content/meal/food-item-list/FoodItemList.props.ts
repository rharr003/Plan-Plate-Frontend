import { FoodItem } from "../../../../../types/foodItem";

export interface FoodItemListProps {
  foodItems: FoodItem[];
  selectedFoodItems?: FoodItem[];
  type: "all" | "selected";
  mealId?: number;
  isEditing: boolean;
}
