import { render, screen } from "@testing-library/react";
import Login from "./Login";

test("renders without crashing", () => {
  render(<Login />);
  const image = screen.getByAltText("healthy food on plate");
  expect(image).toBeInTheDocument();
});
