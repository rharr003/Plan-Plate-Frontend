import { createSlice } from "@reduxjs/toolkit";
import { activeMealPlan } from "../types/activeMealPlan";
import { inactiveMealPlan } from "../types/inactiveMealPlan";

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

    addMealToPlan: (state, action) => {
      state.current!.meals.push(action.payload);
    },
    removeMealFromPlan: (state, action) => {
      state.current!.meals = state.current!.meals.filter(
        (meal) => meal.id !== action.payload
      );
    },

    swapMeal: (state, action) => {
      const { id } = action.payload;
      const mealIndex = state.current!.meals.findIndex(
        (meal) => meal.id === id
      );
      state.current!.meals[mealIndex] = action.payload;
    },

    moveMealUp: (state, action) => {
      const index = action.payload;
      if (index === 0) return;
      const mealsCopy = [...state.current!.meals];
      const meal = mealsCopy[index];
      mealsCopy[index] = mealsCopy[index - 1];
      mealsCopy[index - 1] = meal;
      state.current!.meals = mealsCopy;
    },

    moveMealDown: (state, action) => {
      const index = action.payload;
      if (index === state.current!.meals.length - 1) return;
      const mealsCopy = [...state.current!.meals];
      const meal = mealsCopy[index];
      mealsCopy[index] = mealsCopy[index + 1];
      mealsCopy[index + 1] = meal;
      state.current!.meals = mealsCopy;
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
  addMealToPlan,
  removeMealFromPlan,
  moveMealUp,
  moveMealDown,
  swapMeal,
} = mealPlanSlice.actions;
export default mealPlanSlice.reducer;
