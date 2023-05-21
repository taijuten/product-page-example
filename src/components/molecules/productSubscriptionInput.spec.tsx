import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ProductSubscriptionInput from "./productSubscriptionInput";

describe("ProductSubscriptionInput", () => {
  test("renders correctly", () => {
    // Given
    const onChange = jest.fn();
    const isSelected = true;

    // When
    render(
      <ProductSubscriptionInput onChange={onChange} isSelected={isSelected} />
    );

    // Then
    const switchInput = screen.getByLabelText("Subscription only") as HTMLInputElement;
    expect(switchInput).toBeInTheDocument();
    expect(switchInput.checked).toBe(true);
  });

  test("triggers onChange callback when switched", () => {
    // Given
    const onChange = jest.fn();
    const isSelected = false;

    // When
    render(
      <ProductSubscriptionInput onChange={onChange} isSelected={isSelected} />
    );
    const switchInput = screen.getByLabelText("Subscription only");
    fireEvent.click(switchInput);

    // Then
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
