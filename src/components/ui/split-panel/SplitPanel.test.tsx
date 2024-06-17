import SplitPanel from "./SplitPanel";
import { render, screen } from "@testing-library/react";

function TestChild() {
  return (
    <div>
      <h1>I am the child</h1>
    </div>
  );
}

beforeEach(() => {
  render(
    <SplitPanel
      image={""}
      imageAlt="test"
      heading1="test"
      heading2="test"
      subHeading="test"
    >
      <TestChild />
    </SplitPanel>
  );
});

test("renders without crashing", () => {
  const imageAlt = screen.getByAltText("test");
  expect(imageAlt).toBeInTheDocument();
});

test("renders child component", () => {
  const childText = screen.getByText("I am the child");
  expect(childText).toBeInTheDocument();
});
