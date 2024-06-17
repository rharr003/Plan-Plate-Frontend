import { foodItem } from "../../../../types/food-item/foodItem";
export interface CreateFoodItemProps {
  closeModal: () => void;
  foodItem?: foodItem;
}
