import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import mealPlanReducer from "./mealPlanReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    mealPlan: mealPlanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
