import Home from "./Home";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
});
