import React from "react";
import { render, screen } from "@testing-library/react";
import ProductDetails from "./productDetails";
import { Product } from "../../types/products";

const mockProduct: Product = {
    id: 1,
    image_src: "https://via.placeholder.com/300x300",
    slug: "test-product",
    tags: ["New", "Sale"],
    url: "https://via.placeholder.com/300x300",
    published: true,
    sku: "test-product",
  title: "Test Product",
  vendor: "Test Vendor",
  option_value: "Test Option",
  price: 10.99,
  subscription_discount: 5,
};

describe("ProductDetails", () => {
  test("displays the product details with correct values", () => {
    // Given
    const { title, vendor, option_value, price, subscription_discount } = mockProduct;

    // When
    render(<ProductDetails product={mockProduct} />);

    // Then
    const titleElement = screen.getByText(title);
    const vendorElement = screen.getByText(vendor);
    const optionElement = screen.getByText(option_value);
    const priceElement = screen.getByText(`$${price}`);
    const discountElement = screen.getByText(`$${(price * (1 - subscription_discount / 100)).toFixed(2)}`);

    // Assert
    expect(titleElement).toBeInTheDocument();
    expect(vendorElement).toBeInTheDocument();
    expect(optionElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(discountElement).toBeInTheDocument();
  });
});
