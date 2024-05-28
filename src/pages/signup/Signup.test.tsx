import { render, screen, act } from "@testing-library/react";
import Signup from "./Signup";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const server = setupServer(
  http.post("/auth/signup", () => {
    return HttpResponse.json(
      { data: { token: "test-token" } },
      { status: 200 }
    );
  }),
  http.get("/auth/user", () => {
    return HttpResponse.json({ data: { username: "test" } }, { status: 200 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </Provider>
  );
});

test("renders without crashing", () => {});

test("primary button enables and disables correctly", () => {
  const dateInput = screen.getByLabelText("date_of_birth");
  const primaryButton = screen.getByText("Next");
  expect(primaryButton).toBeDisabled();
  act(() => {
    userEvent.type(dateInput, "1996-12-26");
  });
  expect(primaryButton).toBeEnabled();
  act(() => {
    userEvent.clear(dateInput);
  });
  expect(primaryButton).toBeDisabled();
});

test("form cycles properly and redirects user to home screen upon completion", async () => {
  const dateInput = screen.getByLabelText("date_of_birth");
  const primaryButton = screen.getByText("Next");
  //await is actually needed here
  await act(() => {
    userEvent.type(dateInput, "1996-12-26");
    // cycle to next set of inputs
    userEvent.click(primaryButton);
  });
  //await is actually needed here
  //no required fiels for second stage of signup process continue to cycle
  await act(() => {
    userEvent.click(primaryButton);
  });
  const usernameInput = screen.getByLabelText("username");
  const passwordInput = screen.getByLabelText("password");
  const confirmPasswordInput = screen.getByLabelText("confirmPassword");
  await act(() => {
    userEvent.type(usernameInput, "test");
    userEvent.type(passwordInput, "test");
    userEvent.type(confirmPasswordInput, "test");
  });
  userEvent.click(primaryButton);
  //redirected to home screen
  expect(window.location.pathname).toBe("/");
});
