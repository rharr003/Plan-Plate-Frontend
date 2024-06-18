import { createSlice } from "@reduxjs/toolkit";
import { FoodItem } from "../types/foodItem";
import { f } from "msw/lib/core/HttpResponse-B07UKAkU";

type FoodServing = {
  servingId: number | null;
  foodItemId: number;
  servingMultiple: number;
};

export const mealSlice = createSlice({
  name: "meal",
  initialState: {
    foodItems: [] as FoodItem[],
    servings: [] as FoodServing[],
    originalServings: [] as FoodServing[],
  },
  reducers: {
    setFoodItems: (state, action) => {
      state.foodItems = action.payload;
      state.servings = action.payload.map((foodServing: FoodServing) => ({
        servingId: foodServing.servingId,
        foodItemId: foodServing.foodItemId,
        servingMultiple: foodServing.servingMultiple,
      }));
      state.originalServings = action.payload.map(
        (foodServing: FoodServing) => ({
          servingId: foodServing.servingId,
          foodItemId: foodServing.foodItemId,
          servingMultiple: foodServing.servingMultiple,
        })
      );
    },
    addToMeal: (state, action) => {
      state.foodItems.push(action.payload);
      state.servings.push({
        servingId: null,
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
