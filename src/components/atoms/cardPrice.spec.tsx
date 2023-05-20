import React from "react";
import { render, screen } from "@testing-library/react";
import CardPrice from "./cardPrice";

describe("CardPrice", () => {
  test("displays original price when no discount is provided", () => {
    // Given
    const price = 10;

    // When
    render(<CardPrice price={price} />);

    // Then
    const originalPriceElement = screen.getByText(`$${price}`);
    expect(originalPriceElement).toBeInTheDocument();
  });

  test("displays discounted price with subscription when discount is provided", () => {
    // Given
    const price = 10;
    const discount = 20;

    // When
    render(<CardPrice price={price} discount={discount} />);

    // Then
    const discountedPriceElement = screen.getByText(`$${((price) * ((100 - discount) / 100)).toFixed(2)}`);
    const subscriptionElement = screen.getByText("with subscription");
    expect(discountedPriceElement).toBeInTheDocument();
    expect(subscriptionElement).toBeInTheDocument();
  });

  test("crosses through the original price when discount is provided", () => {
    // Given
    const price = 10;
    const discount = 20;

    // When
    render(<CardPrice price={price} discount={discount} />);

    // Then
    const originalPriceElement = screen.getByText(`$${price}`);
    expect(originalPriceElement).toHaveClass("price-original--cross-through");
  });
});
