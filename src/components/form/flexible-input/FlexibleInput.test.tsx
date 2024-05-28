import React from "react";
import FlexibleInput from "./FlexibleInput";
import { render, screen } from "@testing-library/react";

test("renders without crashing", () => {
  render(
    <FlexibleInput
      handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
      value={""}
      labelText="test"
      name="test"
    />
  );
});

test("error message shows when specified", () => {
  render(
    <FlexibleInput
      handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
      value={""}
      labelText="test"
      name="test"
      errorMessage="I am an error"
    />
  );

  const errorMessage = screen.getByText("I am an error");
  expect(errorMessage).toBeInTheDocument();
});
