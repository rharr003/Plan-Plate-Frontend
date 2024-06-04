import { useEffect, useState } from "react";
import Api from "../../../../../PlanPlateApi";
import MealPlanButtons from "./meal-plan-panel-buttons/MealPlanButtons";

export default function MealPlanPanel(props: { mealPlanId: number }) {
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    async function fetch() {
      await Api.fetchMealPlanDetail(props.mealPlanId);
    }
    fetch();
  }, []);
  return (
    <div>
      <MealPlanButtons />
    </div>
  );
}
