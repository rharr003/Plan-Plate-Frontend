import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import mealPlanReducer from "./mealPlanReducer";
import modalReducer from "./modalReducer";
import foodItemListReducer from "./foodItemListReducer";
import mealReducer from "./mealReducer";
import mealsListReducer from "./mealsListReducer";
export const store = configureStore({
  reducer: {
    user: userReducer,
    mealPlan: mealPlanReducer,
    modals: modalReducer,
    foodItemList: foodItemListReducer,
    meal: mealReducer,
    mealsList: mealsListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
