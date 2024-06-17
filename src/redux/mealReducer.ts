import { createSlice } from "@reduxjs/toolkit";
import { foodItem } from "../types/food-item/foodItem";
import { stat } from "fs";

type FoodServing = {
  foodItemId: number;
  servingMultiple: number;
};

export const mealSlice = createSlice({
  name: "meal",
  initialState: {
    foodItems: [] as foodItem[],
    servings: [] as FoodServing[],
  },
  reducers: {
    setFoodItems: (state, action) => {
      state.foodItems = action.payload;
      state.servings = action.payload.map((foodServing: FoodServing) => ({
        foodItemId: foodServing.foodItemId,
        servingMultiple: foodServing.servingMultiple,
      }));
    },
    addToMeal: (state, action) => {
      state.foodItems.push(action.payload);
      state.servings.push({
        foodItemId: action.payload.id,
        servingMultiple: 1,
      });
    },
    removeFromMeal: (state, action) => {
      state.foodItems = state.foodItems.filter(
        (foodItem) => foodItem.id !== action.payload
      );
      state.servings = state.servings.filter(
        (foodServing) => foodServing.foodItemId !== action.payload
      );
    },
    updateServing: (state, action) => {
      const foodServing = state.servings.find(
        (foodServing) => foodServing.foodItemId === action.payload.foodItemId
      );
      if (foodServing) {
        foodServing.servingMultiple = action.payload.servingMultiple;
      }
    },
  },
});

export const { setFoodItems, addToMeal, removeFromMeal, updateServing } =
  mealSlice.actions;
export default mealSlice.reducer;
