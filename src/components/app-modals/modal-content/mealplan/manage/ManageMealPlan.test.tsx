import { render, screen } from "@testing-library/react";
import ManageMealPlan from "./ManageMealPlan";
import { Provider } from "react-redux";
import { store } from "../../../../../redux/store";
import userEvent from "@testing-library/user-event";

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <ManageMealPlan
        closeModal={() => {}}
        isEditing={false}
        isActive={false}
      />
    </Provider>
  );
});

test("closes when x button clicked", () => {
  const close = jest.fn();
  render(
    <Provider store={store}>
      <ManageMealPlan closeModal={close} isEditing={false} isActive={false} />
    </Provider>
  );
  const closeButton = screen.getByText("X");
  userEvent.click(closeButton);
  expect(close).toHaveBeenCalled();
});

test("adjusts submit button text based on isEditing prop", () => {
  render(
    <Provider store={store}>
      <ManageMealPlan closeModal={close} isEditing={false} isActive={false} />
    </Provider>
  );
  const createButton = screen.getByText("Create");
  expect(createButton).toBeInTheDocument();
  render(
    <Provider store={store}>
      <ManageMealPlan closeModal={close} isEditing={true} isActive={false} />
    </Provider>
  );
  const saveButton = screen.getByText("Save");
  expect(saveButton).toBeInTheDocument();
});
