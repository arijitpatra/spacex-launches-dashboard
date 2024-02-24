import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Filter from "./Filter";
import { STATUS } from "../../constants";

const label = "status";
const options = STATUS;
const value = "success";
const onFilterChange = jest.fn();

describe("Unit tests for Filter:", () => {
  test("renders label correctly:", () => {
    const { getByText } = render(
      <Filter
        label={label}
        options={options}
        value={value}
        onFilterChange={onFilterChange}
      />
    );

    expect(getByText("status:")).toBeInTheDocument();
  });

  test("renders selected value correctly:", () => {
    const { getByLabelText } = render(
      <Filter
        label={label}
        options={options}
        value={value}
        onFilterChange={onFilterChange}
      />
    );

    expect(getByLabelText("status:")).toHaveValue("success");
  });

  test("renders all options correctly:", () => {
    const { getByText } = render(
      <Filter
        label={label}
        options={options}
        value={value}
        onFilterChange={onFilterChange}
      />
    );

    options.forEach((option) => {
      expect(getByText(option)).toBeInTheDocument();
    });
  });

  test("onFilterChange is called when filter is changed:", () => {
    const { getByLabelText } = render(
      <Filter
        label={label}
        options={options}
        value={value}
        onFilterChange={onFilterChange}
      />
    );

    fireEvent.change(getByLabelText("status:"));
    expect(onFilterChange).toHaveBeenCalledTimes(1);
  });
});
