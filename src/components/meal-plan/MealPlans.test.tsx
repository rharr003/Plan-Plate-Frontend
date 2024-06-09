import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import MealPlans from "./MealPlans";
import { store } from "../../redux/store";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { act } from "react-dom/test-utils";
import ModalManager from "../app-modals/ModalManager";

const server = setupServer(
  http.get("/mealplans/", () => {
    return HttpResponse.json(
      {
        plans: [],
      },
      { status: 200 }
    );
  })
);

beforeAll(() => server.listen());
beforeEach(async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <ModalManager />
        <MealPlans />
      </Provider>
    );
  });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders without crashing", async () => {});

test("opens add new modal when button clicked", () => {
  const button = screen.getByText("+ Add New");
  act(() => {
    userEvent.click(button);
  });
  const title = screen.getByText("Create New Meal Plan");
  expect(title).toBeInTheDocument();
});

test("displays welcome tab if no meal plans are fetched", () => {
  const welcome = screen.getByText("Welcome!");
  expect(welcome).toBeInTheDocument();
});
