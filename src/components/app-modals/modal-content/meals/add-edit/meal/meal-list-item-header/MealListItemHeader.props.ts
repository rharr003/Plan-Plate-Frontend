export interface MealListItemHeaderProps {
  name: string;
  calorieTotal: number;
  fatTotal: number;
  carbTotal: number;
  proteinTotal: number;
  handleExpand: () => void;
  expanded: boolean;
  handleDeleteMeal: () => void;
  triggerModal: () => void;
}
