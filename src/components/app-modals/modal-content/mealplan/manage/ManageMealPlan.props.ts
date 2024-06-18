export interface ManageMealPlanProps {
  closeModal: () => void;
  isEditing: boolean;
  isActive: boolean;
  initialName?: string;
  mealPlanId?: number;
}
