import MainNavigation from "./MainNavigation";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";

test("renders without crashing", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <MainNavigation></MainNavigation>
      </Provider>
    </BrowserRouter>
  );
});
