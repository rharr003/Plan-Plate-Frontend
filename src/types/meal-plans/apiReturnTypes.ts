import { activeMealPlan } from "./activeMealPlan";
import { inactiveMealPlan } from "./inactiveMealPlan";

export type fetchMealPlansReturn = {
  active: activeMealPlan;
  inactive: inactiveMealPlan[];
};
