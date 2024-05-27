import LoginForm from "./LoginForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

//setup mock server for testing

const server = setupServer(
  http.post("/auth/login", () => {
    return HttpResponse.json({ error: "Not Authorized" }, { status: 400 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders without crashing", () => {
  render(<LoginForm />);
  const loginButton = screen.getByText("Login");
  const createAccountLink = screen.getByText("Create an account");
  expect(loginButton).toBeInTheDocument();
  expect(createAccountLink).toBeInTheDocument();
});

test("displays error message under both input fields it submitted empty", async () => {
  render(<LoginForm />);
  const loginButton = screen.getByText("Login");
  //wrap any events that trigger a state change in an act function
  act(() => {
    userEvent.click(loginButton);
  });
  const errorMessages = screen.getAllByText("This field is required.");
  expect(errorMessages.length).toBe(2);
});

test("displays error message for incorrect credentials", async () => {
  render(<LoginForm />);
  const loginButton = screen.getByText("Login");
  const usernameInput = screen.getByRole("textbox", { name: "username" });
  const passwordInput = screen.getByRole("textbox", { name: "password" });
  // await actually does have an effect here
  await act(() => {
    userEvent.click(usernameInput);
    userEvent.keyboard("asisdfhkdsfhsafad");
    userEvent.click(passwordInput);
    userEvent.keyboard("asfhashasfasfdas");
    userEvent.click(loginButton);
  });
  const error = screen.getByText("Invalid username or password");
  expect(error).toBeInTheDocument();
});
