import { foodItem } from "../../../../../../../../types/food-item/foodItem";

export interface FoodItemHeaderProps {
  type: string;
  foodItem: foodItem;
  onDangerClick: (foodItemId: number, index?: number) => void;
  onAddClick?: () => void;
  triggerModal: () => void;
  selected?: boolean;
  multiple: number;
  index: number;
}
