import React from "react";
import { render, screen } from "@testing-library/react";
import LazyImage from "./lazyImage";

describe("LazyImage", () => {
  test("renders the image with correct src and alt attributes", () => {
    // Given
    const src = "/path/to/image.jpg";
    const alt = "Test Image";

    // When
    render(<LazyImage src={src} alt={alt} />);

    // Then
    const imageElement = screen.getByAltText(alt);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", src);
    expect(imageElement).toHaveAttribute("alt", alt);
    expect(imageElement).toHaveClass("lazy-image");
    expect(imageElement).toHaveAttribute("loading", "lazy");
  });
});
