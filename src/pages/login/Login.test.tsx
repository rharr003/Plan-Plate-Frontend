import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { act } from "react-dom/test-utils";

const server = setupServer(
  http.post("/auth/login", () => {
    return HttpResponse.json(
      { data: { token: "test-token" } },
      { status: 200 }
    );
  }),
  http.get("/auth/user", () => {
    return HttpResponse.json({ data: { username: "test" } }, { status: 200 });
  })
);
beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
});
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders without crashing", () => {});

test("login button enables and disables properly", () => {
  const usernameInput = screen.getByLabelText("username");
  const passwordInput = screen.getByLabelText("password");
  const loginButton = screen.getByText("Login");
  expect(loginButton).toBeDisabled();
  act(() => {
    userEvent.type(usernameInput, "test");
    userEvent.type(passwordInput, "test");
  });
  expect(loginButton).toBeEnabled();
  act(() => {
    userEvent.clear(usernameInput);
    userEvent.clear(passwordInput);
  });
  expect(loginButton).toBeDisabled();
});

test("user is redirected to home screen after successful log on", () => {
  const usernameInput = screen.getByLabelText("username");
  const passwordInput = screen.getByLabelText("password");
  const loginButton = screen.getByText("Login");
  act(() => {
    userEvent.type(usernameInput, "test");
    userEvent.type(passwordInput, "test");
  });
  userEvent.click(loginButton);
  expect(window.location.pathname).toBe("/");
});
