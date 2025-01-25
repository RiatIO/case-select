import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./select";

describe("Select", () => {
  it("should render the component", () => {
    render(
      <Select>
        <Select.Trigger>Select me</Select.Trigger>
      </Select>
    );
    expect(screen.getByText("Select me")).toBeInTheDocument();
  });

  it("should show options when clicking on the trigger", async () => {
    render(
      <Select>
        <Select.Trigger>Velg hunderase</Select.Trigger>
        <Select.Content>
          <Select.Item value="dog1" name="Dog 1" />
          <Select.Item value="dog2" name="Dog 2" />
          <Select.Item
            value="dog3"
            name="Dog 3"
            description="a very long text description to test overflowing...."
          />
        </Select.Content>
      </Select>
    );

    await userEvent.click(screen.getByText("Velg hunderase"));

    expect(screen.getByRole("menuitem", { name: "dog1" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "dog2" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "dog3" })).toBeInTheDocument();
  });
});
