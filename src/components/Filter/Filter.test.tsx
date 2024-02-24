import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import Filter, { FilterProps } from "./Filter";
import { STATUS } from "../../constants";

const mockFn = jest.fn();

const filterProps: FilterProps = {
  label: "status",
  options: STATUS,
  value: "success",
  onFilterChange: mockFn,
};

describe("Unit tests for Filter:", () => {
  beforeEach(() => {
    render(<Filter {...filterProps} />);
  });

  test("renders label correctly:", () => {
    expect(screen.getByText("status:")).toBeInTheDocument();
  });

  test("renders selected value correctly:", () => {
    expect(screen.getByLabelText("status:")).toHaveValue(filterProps.value);
  });

  test("renders all options correctly:", () => {
    STATUS.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test("onFilterChange is called when filter is changed:", () => {
    fireEvent.change(screen.getByLabelText("status:"));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
