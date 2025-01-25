import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { Select } from "./select";

const options = [
  { value: "dog1", name: "Dog 1" },
  { value: "dog2", name: "Dog 2" },
  {
    value: "dog3",
    name: "Dog 3",
    description: "a very long text description to test overflowing....",
  },
];

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
          {options.map((option) => (
            <Select.Item key={option.value} {...option} />
          ))}
        </Select.Content>
      </Select>
    );

    await userEvent.click(screen.getByText("Velg hunderase"));

    expect(screen.getByText("Dog 1")).toBeInTheDocument();
    expect(screen.getByText("Dog 2")).toBeInTheDocument();
    expect(screen.getByText("Dog 3")).toBeInTheDocument();
  });

  it("should show the name upon selecting an option", async () => {
    render(
      <Select>
        <Select.Trigger>Velg hunderase</Select.Trigger>
        <Select.Content>
          {options.map((option) => (
            <Select.Item key={option.value} {...option} />
          ))}
        </Select.Content>
      </Select>
    );

    await userEvent.click(screen.getByText("Velg hunderase"));
    await userEvent.click(screen.getByText("Dog 1"));

    expect(screen.getByText("Dog 1")).toBeInTheDocument();
  });

  it("should keep focus on the trigger when option is selected", async () => {
    render(
      <Select>
        <Select.Trigger>Velg hunderase</Select.Trigger>
        <Select.Content>
          {options.map((option) => (
            <Select.Item
              key={option.value}
              value={option.value}
              name={option.name}
              description={option.description}
            />
          ))}
        </Select.Content>
      </Select>
    );

    const input = screen.getByRole("button", { name: "Velg hunderase" });
    expect(input).not.toHaveFocus();
    await userEvent.click(input);
    expect(input).toHaveFocus();

    await userEvent.click(screen.getByText("Dog 1"));

    expect(screen.getByRole("button", { name: "Dog 1" })).toHaveFocus();
  });
});
