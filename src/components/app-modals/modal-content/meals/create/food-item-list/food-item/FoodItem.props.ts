import { foodItem } from "../../../../../../../types/food-item/foodItem";
export interface FoodItemProps {
  foodItem: foodItem;
  selected?: boolean;
  onClick: (foodItem: foodItem, selected: boolean) => void;
  onDangerClick: (foodItemId: number, index?: number) => void;
  type: string;
  multiple: number;
  index: number;
}
