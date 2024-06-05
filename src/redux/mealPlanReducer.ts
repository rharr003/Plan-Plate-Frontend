import { createSlice } from "@reduxjs/toolkit";
import { activeMealPlan } from "../types/meal-plans/activeMealPlan";
import { inactiveMealPlan } from "../types/meal-plans/inactiveMealPlan";
import { ModalStackElement } from "../types/general/modalStackElement";

export const mealPlanSlice = createSlice({
  name: "mealplan",
  initialState: {
    active: null as activeMealPlan,
    inactive: [] as inactiveMealPlan[],
    modalStack: [] as ModalStackElement[],
  },
  reducers: {
    pushModalStack: (state, action) => {
      state.modalStack.push(action.payload);
    },
    popModalStack: (state) => {
      state.modalStack.pop();
    },
    addMealPlan: (state, action) => {
      console.log("in redux", action.payload);
      state.inactive.push(action.payload);
    },
    deleteMealPlan: (state, action) => {
      const { mealPlanId } = action.payload;
      state.inactive = state.inactive.filter(
        (mealPlan: inactiveMealPlan) => mealPlan.id !== mealPlanId
      );
    },
    setMealPlans: (state, action) => {
      const { active, inactive } = action.payload;
      state.active = active;
      state.inactive = inactive;
    },
    renameMealPlan: (state, action) => {
      const { name, meal_plan_id: id } = action.payload;
      state.inactive = state.inactive.map((mealPlan) => {
        if (mealPlan.id === id) {
          return {
            ...mealPlan,
            name: name,
          };
        }
        return mealPlan;
      });
    },
  },
});

export const {
  pushModalStack,
  popModalStack,
  addMealPlan,
  deleteMealPlan,
  setMealPlans,
  renameMealPlan,
} = mealPlanSlice.actions;
export default mealPlanSlice.reducer;
