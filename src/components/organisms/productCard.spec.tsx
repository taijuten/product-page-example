import React from "react";
import { render, screen } from "@testing-library/react";
import { Product } from "../../types/products";
import ProductItem from "./productCard";

describe("ProductItem", () => {
  const product: Product = {
    id: 1,
    image_src: "image.jpg",
    title: "Product Title",
    vendor: "Product Vendor",
    option_value: "Product Option",
    price: 10.99,
    subscription_discount: 5,
    url: "https://example.com",
    tags: ["New", "Sale"],
    slug: "product-slug",
    published: true,
    sku: "product-sku",
  };

  test("displays product details and tags", () => {
    // Given
    render(<ProductItem product={product} />);

    // When
    const productImage = screen.getByAltText("Product Image");
    const productTitle = screen.getByText("Product Title");
    const productVendor = screen.getByText("Product Vendor");
    const productOption = screen.getByText("Product Option");
    const productPrice = screen.getByText("$10.99");
    const productDiscount = screen.getByText("$10.44");
    const buyButton = screen.getByRole("button", { name: "Buy Now" });
    const tagNew = screen.getByText("New");
    const tagSale = screen.getByText("Sale");

    // Then
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute("alt", "Product Image");

    expect(productTitle).toBeInTheDocument();
    expect(productTitle).toHaveTextContent("Product Title");

    expect(productVendor).toBeInTheDocument();
    expect(productVendor).toHaveTextContent("Product Vendor");

    expect(productOption).toBeInTheDocument();
    expect(productOption).toHaveTextContent("Product Option");

    expect(productPrice).toBeInTheDocument();
    expect(productPrice).toHaveTextContent("$10.99");

    expect(productDiscount).toBeInTheDocument();
    expect(productDiscount).toHaveTextContent("$10.44");

    expect(buyButton).toBeInTheDocument();
    expect(buyButton).toHaveAttribute("href", "https://example.com");

    expect(tagNew).toBeInTheDocument();
    expect(tagSale).toBeInTheDocument();
  });
});
