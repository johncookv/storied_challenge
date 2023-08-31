import { render, screen } from "@testing-library/react";
import DropdownSelect from "../components/DropdownSelect";

test("loads and displays label", () => {
  const label = "test_label";
  render(<DropdownSelect label={label} options={[]} />);
  expect(screen.getByTestId("selector-input")).toHaveValue(label);
});

test("displays options when open is true", () => {
  const options = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
  ];

  render(<DropdownSelect options={options} open />);
  for (let option of options) {
    expect(screen.getByText(option.label)).toBeInTheDocument();
  }
});
