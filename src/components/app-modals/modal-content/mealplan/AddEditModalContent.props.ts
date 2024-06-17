export interface AddEditModalContentProps {
  closeModal: () => void;
  isEditing: boolean;
  isActive: boolean;
  initialName?: string;
  mealPlanId?: number;
}
