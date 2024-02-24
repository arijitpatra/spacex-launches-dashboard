import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import SearchAndFilterBar from "./SearchAndFilterBar";

const mockFn = jest.fn();

describe("Unit tests for SearchAndFilterBar:", () => {
  beforeEach(() => {
    render(
      <SearchAndFilterBar
        status="all"
        searchText=""
        onStatusChange={mockFn}
        onSearchChange={mockFn}
      />
    );
  });

  test("check the sub-header renders correctly initally:", () => {
    expect(screen.getByText("all launches 🚀")).toBeInTheDocument();
  });

  test("ensure the mockFn to have been called when the filter is changed:", () => {
    fireEvent.change(screen.getByDisplayValue("all"));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("ensure search input is renderd:", () => {
    const searchInput = screen.getByPlaceholderText(
      "🔍 Type a mission or rocket name to search..."
    );
    expect(searchInput).toBeInTheDocument();
  });

  test("ensure search input has type text:", () => {
    const searchInput = screen.getByPlaceholderText(
      "🔍 Type a mission or rocket name to search..."
    );
    expect(searchInput).toHaveAttribute("type", "text");
  });

  test("ensure the mockFn to have been called when the search is changed:", () => {
    const searchInput = screen.getByPlaceholderText(
      "🔍 Type a mission or rocket name to search..."
    );
    fireEvent.change(searchInput);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
