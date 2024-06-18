import { Meal } from "./meal";

export type activeMealPlan = {
  id: number;
  name: string;
  meals: Meal[];
  active: boolean;
} | null;
