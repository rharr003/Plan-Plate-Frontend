import { FoodItem } from "../../../../types/foodItem";
export interface ManageFoodItemProps {
  closeModal: () => void;
  foodItem?: FoodItem;
}
