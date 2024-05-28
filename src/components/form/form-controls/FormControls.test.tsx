import { BrowserRouter } from "react-router-dom";
import FormControls from "./FormControls";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("renders without crashing", () => {
  render(
    <BrowserRouter>
      <FormControls
        showSecondary={true}
        primaryOnClick={() => {}}
        primaryDisabled={false}
        primaryText="test"
      />
    </BrowserRouter>
  );
});

test("buttons work when enabled", () => {
  const test = jest.fn();
  render(
    <BrowserRouter>
      <FormControls
        showSecondary={true}
        secondaryDisabled={false}
        secondaryOnClick={test}
        primaryOnClick={test}
        primaryDisabled={false}
        primaryText="click me"
      />
    </BrowserRouter>
  );

  const primaryButton = screen.getByText("click me");
  const secondaryButton = screen.getByText("Back");
  userEvent.click(primaryButton);
  userEvent.click(secondaryButton);
  expect(test).toHaveBeenCalledTimes(2);
});

test("buttons do nothing when disabled", () => {
  const test = jest.fn();
  render(
    <BrowserRouter>
      <FormControls
        showSecondary={true}
        secondaryDisabled={true}
        secondaryOnClick={test}
        primaryOnClick={test}
        primaryDisabled={true}
        primaryText="click me"
      />
    </BrowserRouter>
  );

  const primaryButton = screen.getByText("click me");
  const secondaryButton = screen.getByText("Back");
  userEvent.click(primaryButton);
  userEvent.click(secondaryButton);
  expect(test).not.toHaveBeenCalled();
});
