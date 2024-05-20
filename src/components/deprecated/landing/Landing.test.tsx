import { render, screen } from "@testing-library/react";
import Landing from "./Landing";

test("renders without crashing", () => {
  render(<Landing />);
  const signOnButton = screen.getByText("Sign On");
  const signUpButton = screen.getByText("Create Account");
  expect(signOnButton).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
});
