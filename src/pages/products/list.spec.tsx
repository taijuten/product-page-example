import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import ProductList from "./list";
import { BrowserRouter } from 'react-router-dom';

// Mock API response
const mockProducts = [
  {
    id: 1,
    slug: "product-1",
    image_src: "/path/to/image1.jpg",
    title: "Product 1",
    vendor: "Vendor 1",
    published: true,
    tags: ["Tag 1", "Tag 2"],
    option_value: "Option 1",
    price: 10.99,
    sku: "SKU1",
    subscription_discount: 0.2,
    url: "/product/1",
  },
  {
    id: 2,
    slug: "product-2",
    image_src: "/path/to/image2.jpg",
    title: "Product 2",
    vendor: "Vendor 2",
    published: true,
    tags: ["Tag 3", "Tag 4"],
    option_value: "Option 2",
    price: 19.99,
    sku: "SKU2",
    subscription_discount: 0.1,
    url: "/product/2",
  },
];

// Setup mock server
const server = setupServer(
  rest.get(`${process.env.REACT_APP_API_HOST}/products`, (req, res, ctx) => {
    return res(ctx.json(mockProducts));
  })
);

// Run server before running tests
beforeAll(() => server.listen());

// Clean up server after running tests
afterAll(() => server.close());

describe("ProductList", () => {
  test("displays loading message when loading", () => {
    // Given
    server.use(
      rest.get(`${process.env.REACT_APP_API_HOST}/products`, (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockProducts));
      })
    );

    // When
    render(
        <BrowserRouter>
            <ProductList />
        </BrowserRouter>
    );

    // Then
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error message when fetch fails", async () => {
    // Given
    const errorMessage = "Failed to fetch products";
    server.use(
      rest.get(`${process.env.REACT_APP_API_HOST}/products`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: errorMessage }));
      })
    );

    // When
    render(
        <BrowserRouter>
            <ProductList />
        </BrowserRouter>
    );

    // Then
    expect(await screen.findByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  test("displays products when fetched successfully", async () => {
    // Given
    server.use(
      rest.get(`${process.env.REACT_APP_API_HOST}/products`, (req, res, ctx) => {
        return res(ctx.json(mockProducts));
      })
    );

    // When
    render(
        <BrowserRouter>
            <ProductList />
        </BrowserRouter>
    );

    // Then
    expect(await screen.findByText("Products")).toBeInTheDocument();
    await screen.findByText(`Showing ${mockProducts.length} products`);
  });
});
