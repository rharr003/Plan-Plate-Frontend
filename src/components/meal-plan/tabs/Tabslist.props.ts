import { inactiveMealPlan } from "../../../types/meal-plans/inactiveMealPlan";
import { activeMealPlan } from "../../../types/meal-plans/activeMealPlan";
export interface TabsListProps {
  activeMealPlan: activeMealPlan;
  inactiveMealPlans: inactiveMealPlan[];
}
