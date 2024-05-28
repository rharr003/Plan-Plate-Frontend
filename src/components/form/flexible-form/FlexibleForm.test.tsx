import FlexibleForm from "./FlexibleForm";
import { render, screen } from "@testing-library/react";
import { FlexibleFormProps } from "./FlexibleFormProps";
import React from "react";
import { BrowserRouter } from "react-router-dom";

const testProps: FlexibleFormProps = {
  formData: {
    test: {
      value: "",
      type: "text",
      error: "",
      label: "test",
    },
    test2: {
      value: "",
      type: "text",
      error: "",
      label: "test",
    },
  },
  canProceed: true,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  primaryOnClick: () => {},
  primaryText: "test",
  showSecondary: false,
  linkHref: "/",
  linkText: "test",
};

test("renders without crashing", () => {
  render(
    <BrowserRouter>
      <FlexibleForm
        formData={testProps.formData}
        canProceed={testProps.canProceed}
        handleChange={testProps.handleChange}
        primaryOnClick={testProps.primaryOnClick}
        primaryText={testProps.primaryText}
        showSecondary={testProps.showSecondary}
        linkHref={testProps.linkHref}
        linkText={testProps.linkText}
      />
    </BrowserRouter>
  );
});

test("renders the correct number of inputs", () => {
  render(
    <BrowserRouter>
      <FlexibleForm
        formData={testProps.formData}
        canProceed={testProps.canProceed}
        handleChange={testProps.handleChange}
        primaryOnClick={testProps.primaryOnClick}
        primaryText={testProps.primaryText}
        showSecondary={testProps.showSecondary}
        linkHref={testProps.linkHref}
        linkText={testProps.linkText}
      />
    </BrowserRouter>
  );
  const inputElements = screen.getAllByRole("textbox");
  expect(inputElements.length).toBe(2);
});
