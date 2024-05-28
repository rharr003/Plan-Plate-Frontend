import Home from "./Home";
import { render } from "@testing-library/react";

test("renders without crashing", () => {
  render(<Home />);
});
