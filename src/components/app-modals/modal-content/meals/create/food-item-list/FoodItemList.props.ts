import { foodItem } from "../../../../../../types/food-item/foodItem";

export interface FoodItemListProps {
  foodItems: foodItem[];
  selectedFoodItems: foodItem[];
  handleSelectFoodItem: (foodItemId: number) => void;
  triggerModal: (type: string) => void;
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
