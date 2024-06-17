import { createSlice } from "@reduxjs/toolkit";
import { Meal } from "../types/meal/meal";

export const mealsListSlice = createSlice({
  name: "mealsList",
  initialState: {
    meals: [] as Meal[],
  },
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload;
    },

    deleteMeal: (state, action) => {
      const { mealId } = action.payload;
      state.meals = state.meals.filter((meal) => meal.id !== mealId);
    },
  },
});

export const { setMeals, deleteMeal } = mealsListSlice.actions;

export default mealsListSlice.reducer;
