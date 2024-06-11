import { activeMealPlan } from "../meal-plans/activeMealPlan";
import { inactiveMealPlan } from "../meal-plans/inactiveMealPlan";

export type fetchMealPlansReturn = {
  plans: inactiveMealPlan[];
};
