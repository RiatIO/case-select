import { render, screen } from "@testing-library/react";
import { Select } from "./select";

describe("Select", () => {
  it("should render the component", () => {
    render(<Select />);
    expect(screen.getByText("Select")).toBeInTheDocument();
  });
});
