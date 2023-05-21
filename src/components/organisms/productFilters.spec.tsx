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

  it("should update search query, min price, max price, and subscription on input change and navigate to the updated URL", () => {
    // Given
    const mockNavigate = jest.fn() as jest.MockedFunction<any>;
    const mockUseLocation = jest.fn() as jest.MockedFunction<any>;
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockUseLocation);

    const queryParams = { search: "initial", min: "0", max: "1000", subscription: "false" };
    (qs.parse as jest.Mock).mockReturnValue(queryParams);
    (qs.stringify as jest.Mock).mockReturnValue(
      "search=updated&min=50&max=500&subscription=true"
    );

    render(
      <BrowserRouter>
        <ProductFilters />
      </BrowserRouter>
    );

    const searchInput = screen.getByLabelText("Search") as HTMLInputElement;
    const minPriceInput = screen.getByLabelText("Min Price") as HTMLInputElement;
    const maxPriceInput = screen.getByLabelText("Max Price") as HTMLInputElement;
    const subscriptionInput = screen.getByLabelText("Subscription only") as HTMLInputElement;

    const newSearchQuery = "updated";
    const newMinPrice = "50";
    const newMaxPrice = "500";

    // When
    fireEvent.change(searchInput, { target: { value: newSearchQuery } });
    fireEvent.change(minPriceInput, { target: { value: newMinPrice } });
    fireEvent.change(maxPriceInput, { target: { value: newMaxPrice } });
    fireEvent.click(subscriptionInput);

    // Then
    expect(searchInput.value).toBe(newSearchQuery);
    expect(minPriceInput.value).toBe(newMinPrice);
    expect(maxPriceInput.value).toBe(newMaxPrice);
    expect(subscriptionInput.checked).toBe(true);
    expect(qs.parse).toHaveBeenCalledTimes(5);
    expect(qs.stringify).toHaveBeenCalledTimes(5);
    expect(useNavigate).toHaveBeenCalledTimes(5);
    expect(useLocation).toHaveBeenCalledTimes(5);
    expect(mockNavigate).toHaveBeenCalledWith("?search=updated&min=50&max=500&subscription=true");
  });

  it("should initialize search query, min price, max price, and subscription with values from URL query params", () => {
    // Given
    const mockNavigate = jest.fn() as jest.MockedFunction<any>;
    const mockUseLocation = jest.fn() as jest.MockedFunction<any>;
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockUseLocation);

    const queryParams = { search: "initial", min: "0", max: "1000", subscription: "true" };
    (qs.parse as jest.Mock).mockReturnValue(queryParams);

    // When
    render(
      <BrowserRouter>
        <ProductFilters />
      </BrowserRouter>
    );

    const searchInput = screen.getByLabelText("Search") as HTMLInputElement;
    const minPriceInput = screen.getByLabelText("Min Price") as HTMLInputElement;
    const maxPriceInput = screen.getByLabelText("Max Price") as HTMLInputElement;
    const subscriptionInput = screen.getByLabelText("Subscription only") as HTMLInputElement;

    // Then
    expect(searchInput.value).toBe(queryParams.search);
    expect(minPriceInput.value).toBe(queryParams.min);
    expect(maxPriceInput.value).toBe(queryParams.max);
    expect(subscriptionInput.checked).toBe(true);
    expect(qs.parse).toHaveBeenCalledTimes(1);
    // A child component calls stringify once
    expect(qs.stringify).toHaveBeenCalledTimes(1);
    expect(useNavigate).toHaveBeenCalledTimes(1);
    expect(useLocation).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
