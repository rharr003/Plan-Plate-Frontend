import { createSlice } from "@reduxjs/toolkit";
import { foodItem } from "../types/food-item/foodItem";

export const foodItemListSlice = createSlice({
  name: "foodItem",
  initialState: {
    all: [] as foodItem[],
    filtered: [] as foodItem[],
    search: "",
  },
  reducers: {
    addFoodItem: (state, action) => {
      state.all.push(action.payload);
    },
    setFoodItems: (state, action) => {
      state.all = action.payload;
    },
    deleteFoodItem: (state, action) => {
      state.all = state.all.filter(
        (foodItem) => foodItem.id !== action.payload
      );
      state.filtered = state.filtered.filter(
        (foodItem) => foodItem.id !== action.payload
      );
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      if (action.payload === "") state.filtered = [];
      else
        state.filtered = state.all.filter((foodItem) =>
          foodItem.name.toLowerCase().includes(action.payload.toLowerCase())
        );
    },
  },
});

export const { addFoodItem, setFoodItems, deleteFoodItem, setSearch } =
  foodItemListSlice.actions;
export default foodItemListSlice.reducer;
