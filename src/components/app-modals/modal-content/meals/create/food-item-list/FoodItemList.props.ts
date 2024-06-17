import { foodItem } from "../../../../../../types/food-item/foodItem";

export interface FoodItemListProps {
  foodItems: foodItem[];
  selectedFoodItems?: foodItem[];
  type: "all" | "selected";
  mealId?: number;
}
