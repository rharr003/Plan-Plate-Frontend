import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import mealPlanReducer from "./mealPlanReducer";
import modalReducer from "./modalReducer";
import foodItemReducer from "./foodItemReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    mealPlan: mealPlanReducer,
    modals: modalReducer,
    foodItem: foodItemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
