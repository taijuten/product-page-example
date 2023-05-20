import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PriceFilterInput from "./priceFilterInput";

describe("PriceFilterInput", () => {
  test("renders with correct min and max values", () => {
    // Given
    const min = 50;
    const max = 500;

    // When
    render(
      <PriceFilterInput
        onMinChange={() => {}}
        onMaxChange={() => {}}
        min={min}
        max={max}
      />
    );

    const minInput = screen.getByLabelText("Min Price") as HTMLInputElement;
    const maxInput = screen.getByLabelText("Max Price") as HTMLInputElement;

    // Then
    expect(minInput.value).toBe(min.toString());
    expect(maxInput.value).toBe(max.toString());
  });

  test("triggers onMinChange and onMaxChange callbacks", () => {
    // Given
    const onMinChange = jest.fn();
    const onMaxChange = jest.fn();

    // When
    render(
      <PriceFilterInput
        onMinChange={onMinChange}
        onMaxChange={onMaxChange}
        min={0}
        max={1000}
      />
    );

    const minInput = screen.getByLabelText("Min Price");
    const maxInput = screen.getByLabelText("Max Price");

    fireEvent.change(minInput, { target: { value: "50" } });
    fireEvent.change(maxInput, { target: { value: "500" } });

    // Then
    expect(onMinChange).toHaveBeenCalledWith("50");
    expect(onMaxChange).toHaveBeenCalledWith("500");
  });
});
