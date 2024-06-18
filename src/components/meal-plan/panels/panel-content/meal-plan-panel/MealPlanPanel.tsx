import { useEffect, useState } from "react";
import Api from "../../../../../PlanPlateApi";
import MealPlanButtons from "./buttons/MealPlanButtons";
import { MealPlanPanelProps } from "./MealPlanPanel.props";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { setCurrentMealPlan } from "../../../../../redux/mealPlanReducer";
import MealList from "./meal-list/MealList";
import {
  deleteMealPlan,
  setActiveMealPlan,
} from "../../../../../redux/mealPlanReducer";
import { openModal } from "../../../../../redux/modalReducer";
import PlanStats from "./plan-stats/PlanStats";

export default function MealPlanPanel(props: MealPlanPanelProps) {
  const mealPlan = useAppSelector((state) => state.mealPlan.current);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetch() {
      const result = await Api.fetchMealPlanDetail(props.mealPlanId);
      dispatch(setCurrentMealPlan(result.data));
      setLoading(false);
    }
    fetch();
  }, []);

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

  function triggerModal(
    type: string,
    dimensions: { height: string; width: string }
  ) {
    const context = {
      mealPlanId: props.mealPlanId,
      mealPlanName: mealPlan!.name,
      isActive: mealPlan!.active,
    };
    dispatch(
      openModal({
        type,
        context,
        ...dimensions,
      })
    );
  }

  if (loading) {
    return <div></div>;
  }
  return (
    <>
      <PlanStats meals={mealPlan!.meals} />
      <MealPlanButtons
        triggerModal={triggerModal}
        handleMakeActive={handleMakeActive}
        handleDelete={handleDelete}
        mealPlanId={props.mealPlanId}
        name={mealPlan!.name}
        isActive={mealPlan!.active}
      />
      <MealList mealPlanId={mealPlan!.id} />
    </>
  );
}
