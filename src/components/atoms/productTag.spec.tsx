import React from "react";
import { render, screen } from "@testing-library/react";
import ProductTag from "./productTag";

describe("ProductTag", () => {
  test("renders the product tag with the correct text", () => {
    // Given
    const tag = "New";

    // When
    render(<ProductTag tag={tag} />);
    const tagElement = screen.getByText(tag);

    // Then
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass("badge");
    expect(tagElement).toHaveClass("mx-1");
    expect(tagElement).toHaveClass("bg-secondary");
  });
});