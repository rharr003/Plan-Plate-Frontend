import MainNavigation from "./MainNavigation";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("renders without crashing", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <MainNavigation logout={() => {}}></MainNavigation>
      </Provider>
    </BrowserRouter>
  );
});

test("call logout when clicked", () => {
  const logout = jest.fn();
  render(
    <BrowserRouter>
      <Provider store={store}>
        <MainNavigation logout={logout}></MainNavigation>
      </Provider>
    </BrowserRouter>
  );
  const logoutLink = screen.getByText("Logout ()");
  userEvent.click(logoutLink);
  expect(logout).toHaveBeenCalled();
});
