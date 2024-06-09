export type ModalStackElement = {
  type: string;
  context?: ModalContextProvider;
};

type ModalContextProvider = {
  mealPlanId?: number;
  mealPlanName?: string;
  mealId?: number;
  mealName?: string;
  foodServingId?: number;
  foodItemName?: string;
  foodItemId?: string;
};
