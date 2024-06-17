import { foodItem } from "../food-item/foodItem";

export type ModalStackElement = {
  type: string;
  context?: ModalContextProvider;
  height?: string;
  width?: string;
};

type ModalContextProvider = {
  mealPlanId?: number;
  mealPlanName?: string;
  isActive?: boolean;
  mealId?: number;
  mealName?: string;
  foodServingId?: number;
  foodItem?: foodItem;
};
