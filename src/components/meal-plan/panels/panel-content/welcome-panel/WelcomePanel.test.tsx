import { render } from "@testing-library/react";
import WelcomePanel from "./WelcomePanel";

test("renders without crashing", () => {
  render(<WelcomePanel />);
});
