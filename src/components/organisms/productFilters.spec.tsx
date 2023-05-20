import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import qs from "query-string";
import ProductFilters from "./productFilters";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn()
}));

jest.mock("query-string", () => ({
  parse: jest.fn(),
  stringify: jest.fn()
}));

describe("ProductFilters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update search query on input change and navigate to the updated URL", () => {
    // Given
    const mockNavigate = jest.fn() as jest.MockedFunction<any>;
    const mockUseLocation = jest.fn() as jest.MockedFunction<any>;
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockUseLocation);

    const queryParams = { search: "initial" };
    (qs.parse as jest.Mock).mockReturnValue(queryParams);
    (qs.stringify as jest.Mock).mockReturnValue("search=updated");

    render(
      <BrowserRouter>
        <ProductFilters />
      </BrowserRouter>
    );

    const searchInput = screen.getByLabelText("Search") as HTMLInputElement;

    const newSearchQuery = "updated";

    // When
    fireEvent.change(searchInput, { target: { value: newSearchQuery } });

    // Then
    expect(searchInput.value).toBe(newSearchQuery);
    expect(qs.parse).toHaveBeenCalledTimes(2);
    expect(qs.stringify).toHaveBeenCalledTimes(2);
    expect(useNavigate).toHaveBeenCalledTimes(2);
    expect(useLocation).toHaveBeenCalledTimes(2);
    expect(mockNavigate).toHaveBeenCalledWith("?search=updated");
  });

  it("should initialize search query with value from URL query params", () => {
    // Given
    const mockNavigate = jest.fn() as jest.MockedFunction<any>;
    const mockUseLocation = jest.fn() as jest.MockedFunction<any>;
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockUseLocation);

    const queryParams = { search: "initial" };
    (qs.parse as jest.Mock).mockReturnValue(queryParams);

    // When
    render(
      <BrowserRouter>
        <ProductFilters />
      </BrowserRouter>
    );

    const searchInput = screen.getByLabelText("Search") as HTMLInputElement;

    // Then
    expect(searchInput.value).toBe(queryParams.search);
    expect(qs.parse).toHaveBeenCalledTimes(1);
    // a child component calls stringify once
    expect(qs.stringify).toHaveBeenCalledTimes(1);
    expect(useNavigate).toHaveBeenCalledTimes(1);
    expect(useLocation).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
