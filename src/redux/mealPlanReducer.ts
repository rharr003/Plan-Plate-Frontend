import { createSlice } from "@reduxjs/toolkit";
import { activeMealPlan } from "../types/meal-plans/activeMealPlan";
import { inactiveMealPlan } from "../types/meal-plans/inactiveMealPlan";

export const mealPlanSlice = createSlice({
  name: "mealplan",
  initialState: {
    current: null as activeMealPlan,
    all: [] as inactiveMealPlan[],
    currTab: 0,
  },
  reducers: {
    addMealPlan: (state, action) => {
      if (action.payload.active) {
        state.all = state.all.map((plan) => ({
          ...plan,
          active: false,
        }));
        state.all.unshift(action.payload);
        state.currTab = 0;
      } else {
        state.all.push(action.payload);
        state.currTab = state.all.length - 1;
      }
    },

    deleteMealPlan: (state, action) => {
      const { mealPlanId } = action.payload;
      state.all = state.all.filter(
        (mealPlan: inactiveMealPlan) => mealPlan.id !== mealPlanId
      );
      state.currTab = 0;
    },

    setMealPlans: (state, action) => {
      const { plans } = action.payload;
      state.all = plans;
    },

    renameMealPlan: (state, action) => {
      const { name, meal_plan_id: id } = action.payload;
      state.all = state.all.map((mealPlan) => {
        if (mealPlan.id === id) {
          return {
            ...mealPlan,
            name: name,
          };
        }
        return mealPlan;
      });
    },
    setCurrentMealPlan: (state, action) => {
      state.current = action.payload;
    },

    setActiveMealPlan: (state, action) => {
      let copy = state.all;
      copy = copy.map((plan) => {
        if (plan.id === action.payload.id) {
          return {
            ...plan,
            active: true,
          };
        }
        return {
          ...plan,
          active: false,
        };
      });
      state.all = copy;
      state.current!.active = true;
    },
    selectTab(state, action) {
      state.currTab = action.payload.index;
    },
  },
});

export const {
  addMealPlan,
  deleteMealPlan,
  setMealPlans,
  renameMealPlan,
  selectTab,
  setCurrentMealPlan,
  setActiveMealPlan,
} = mealPlanSlice.actions;
export default mealPlanSlice.reducer;
