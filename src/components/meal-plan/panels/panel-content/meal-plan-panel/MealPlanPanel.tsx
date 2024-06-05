import { useEffect, useState } from "react";
import Api from "../../../../../PlanPlateApi";
import MealPlanButtons from "./meal-plan-panel-buttons/MealPlanButtons";
import { MealPlanPanelProps } from "./MealPlanPanel.props";

export default function MealPlanPanel(props: MealPlanPanelProps) {
  const [mealPlan, setMealPlan] = useState({ id: props.mealPlanId, name: "" });

  useEffect(() => {
    async function fetch() {
      const result = await Api.fetchMealPlanDetail(props.mealPlanId);
      setMealPlan(result.data);
    }
    fetch();
  }, []);
  return (
    <div>
      <MealPlanButtons mealPlanId={props.mealPlanId} name={mealPlan.name} />
    </div>
  );
}
