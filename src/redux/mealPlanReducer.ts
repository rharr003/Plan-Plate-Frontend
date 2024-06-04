import { createSlice } from "@reduxjs/toolkit";
import { activeMealPlan } from "../types/meal-plans/activeMealPlan";
import { inactiveMealPlan } from "../types/meal-plans/inactiveMealPlan";

export const mealPlanSlice = createSlice({
  name: "mealplan",
  initialState: {
    active: {},
    inactive: <any>[],
    modalStack: <any>[],
  },
  reducers: {
    pushModalStack: (state, action) => {
      state.modalStack.push(action.payload);
    },
    popModalStack: (state) => {
      state.modalStack.pop();
    },
  },
});

export const { pushModalStack, popModalStack } = mealPlanSlice.actions;
export default mealPlanSlice.reducer;
