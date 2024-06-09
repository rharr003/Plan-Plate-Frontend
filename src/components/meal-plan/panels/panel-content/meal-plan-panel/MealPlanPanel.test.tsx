import { render, screen } from "@testing-library/react";
import MealPlanPanel from "./MealPlanPanel";
import { Provider } from "react-redux";
import { store } from "../../../../../redux/store";

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MealPlanPanel mealPlanId={1} />
    </Provider>
  );
});
