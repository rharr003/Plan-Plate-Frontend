import Logout from "./Logout";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

test("renders without crashing", function () {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Logout />
      </Provider>
    </BrowserRouter>
  );
});
