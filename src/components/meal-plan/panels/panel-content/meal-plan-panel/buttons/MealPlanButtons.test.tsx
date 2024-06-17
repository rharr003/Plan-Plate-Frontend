import { Provider } from "react-redux";
import { store } from "../../../../../../redux/store";
import { render, screen } from "@testing-library/react";
import MealPlanButtons from "./MealPlanButtons";

beforeEach(() => {
  render(
    <Provider store={store}>
      <MealPlanButtons mealPlanId={1} name="test" isActive={false} />
    </Provider>
  );
});

test("renders without crashing", () => {
  const buttons = screen.getAllByRole("button");
  expect(buttons.length).toBe(4);
});
