import { Meal } from "../../../../../../types/meal";

export interface MealListItemProps {
  meal: Meal;
  handleSelect: (mealId: number) => void;
  handleRemove: (mealId: number) => void;
  hideSelect?: boolean;
  index: number;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
}
