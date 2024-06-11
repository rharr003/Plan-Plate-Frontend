import { foodItem } from "../../../../../../../types/food-item/foodItem";
export interface FoodItemProps {
  foodItem: foodItem;
  selected: boolean;
  handleSelectFoodItem: (id: number) => void;
}
