import { FoodItem } from "../../../../../../../types/foodItem";

export interface FoodItemHeaderProps {
  type: string;
  foodItem: FoodItem;
  onDangerClick: (foodItemId: number, index?: number) => void;
  onAddClick?: () => void;
  triggerModal: () => void;
  selected?: boolean;
  multiple: number;
  index: number;
  isEditing: boolean;
}
