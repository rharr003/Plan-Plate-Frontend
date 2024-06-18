import { FoodItem } from "../../../../../../types/foodItem";
export interface FoodListItemProps {
  foodItem: FoodItem;
  selected?: boolean;
  onClick: (foodItem: FoodItem, selected: boolean) => void;
  onDangerClick: (foodItemId: number, index?: number) => void;
  type: string;
  multiple: number;
  index: number;
  isEditing: boolean;
}
