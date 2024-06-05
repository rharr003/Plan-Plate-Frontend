import "./MealPlanButtons.css";
import { MealPlanButtonProps } from "./MealPlanButtons.props";
import Api from "../../../../../../PlanPlateApi";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { deleteMealPlan } from "../../../../../../redux/mealPlanReducer";
import { openModal } from "../../../../../../redux/modalReducer";

export default function MealPlanButtons(props: MealPlanButtonProps) {
  const dispatch = useAppDispatch();
  async function handleDelete() {
    const result = await Api.deleteMealPlan(props.mealPlanId);
    if (result.status === 200) {
      dispatch(deleteMealPlan({ mealPlanId: props.mealPlanId }));
    } else {
      alert("There was an issue deleting this meal plan");
    }
  }

  function openRenameModal() {
    dispatch(
      openModal({
        databaseObjectId: props.mealPlanId,
        type: "rename",
        contextString: props.name,
      })
    );
  }
  return (
    <div className="meal-plan-button-container">
      <button className="btn-secondary" onClick={openRenameModal}>
        Rename
      </button>
      <button className="btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
