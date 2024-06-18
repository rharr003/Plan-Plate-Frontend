export interface MealPlanButtonProps {
  mealPlanId: number;
  name: string;
  isActive: boolean;
  handleDelete: () => void;
  handleMakeActive: () => void;
  triggerModal: (
    type: string,
    dimension: { height: string; width: string }
  ) => void;
}
