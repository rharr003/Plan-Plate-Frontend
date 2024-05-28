import { BrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";
import { render } from "@testing-library/react";

test("renders without crashing", () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
});
