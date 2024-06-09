import "./MealPlanButtons.css";
import { MealPlanButtonProps } from "./MealPlanButtons.props";
import Api from "../../../../../../PlanPlateApi";
import { useAppDispatch } from "../../../../../../redux/hooks";
import {
  deleteMealPlan,
  setActiveMealPlan,
} from "../../../../../../redux/mealPlanReducer";
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

  async function handleMakeActive() {
    const result = await Api.updateMealPlan({
      meal_plan_id: props.mealPlanId,
      active: true,
    });
    if (result.status === 200) {
      dispatch(setActiveMealPlan({ id: props.mealPlanId }));
    } else {
      alert("There was an issue setting this as the active meal plan");
    }
  }

  function triggerModal(type: string) {
    const context = {
      mealPlanId: props.mealPlanId,
      mealPlanName: props.name,
    };
    dispatch(
      openModal({
        type,
        context,
      })
    );
  }
  return (
    <>
      <button
        className="btn btn-submit"
        onClick={() => triggerModal("add-meal")}
      >
        + Add Meal
      </button>
      {!props.isActive && (
        <button className="btn btn-info" onClick={handleMakeActive}>
          Set as active
        </button>
      )}
      <button
        className="btn btn-warning"
        onClick={() => triggerModal("rename")}
      >
        Rename
      </button>
      <button className="btn btn-delete" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
