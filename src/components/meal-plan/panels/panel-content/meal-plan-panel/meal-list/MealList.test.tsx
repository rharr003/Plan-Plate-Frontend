import MealList from "./MealList";
import { Provider } from "react-redux";
import { store } from "../../../../../../redux/store";
import { render, screen } from "@testing-library/react";
import { setCurrentMealPlan } from "../../../../../../redux/mealPlanReducer";

beforeEach(() => {
  store.dispatch(
    setCurrentMealPlan({ id: 1, name: "test", meals: [], active: true })
  );
  render(
    <Provider store={store}>
      <MealList />
    </Provider>
  );
});

test("renders without crashing", () => {});
