import { useEffect, useState } from "react";
import Api from "../../../../../PlanPlateApi";
import MealPlanButtons from "./buttons/MealPlanButtons";
import { MealPlanPanelProps } from "./MealPlanPanel.props";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { setCurrentMealPlan } from "../../../../../redux/mealPlanReducer";
import MealList from "./meal-list/MealList";

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

  if (loading) {
    return <div></div>;
  }
  return (
    <div>
      <MealPlanButtons
        mealPlanId={props.mealPlanId}
        name={mealPlan!.name}
        isActive={mealPlan!.active}
      />
      <MealList />
    </div>
  );
}
