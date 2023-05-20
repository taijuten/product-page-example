import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import useProductsApi from "./useProductsApi";
import { Product } from "../types/products";

// Mock API response
const mockProducts: Product[] = [
  {
    id: 1,
    slug: "product-1",
    image_src: "product-1.jpg",
    title: "Product 1",
    vendor: "Vendor 1",
    published: true,
    tags: ["tag1", "tag2"],
    option_value: "option1",
    price: 10,
    sku: "SKU123",
    subscription_discount: 0.1,
    url: "/product-1",
  },
  {
    id: 2,
    slug: "product-2",
    image_src: "product-2.jpg",
    title: "Product 2",
    vendor: "Vendor 2",
    published: true,
    tags: ["tag3", "tag4"],
    option_value: "option2",
    price: 20,
    sku: "SKU456",
    subscription_discount: 0.2,
    url: "/product-2",
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

describe("useProductsApi", () => {
  test("returns initial loading state", () => {
    // When
    const { result } = renderHook(() => useProductsApi());

    // Then
    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe("");
    expect(result.current.nextPage).toBe(1);
    expect(result.current.hasMore).toBe(true);
  });

  test("fetches and returns products", async () => {
    // Given
    server.use(
      rest.get(`${process.env.REACT_APP_API_HOST}/products`, (req, res, ctx) => {
        return res(ctx.json(mockProducts));
      })
    );

    // When
    const { result, waitForNextUpdate } = renderHook(() => useProductsApi(undefined, undefined, undefined, 1, mockProducts.length));
    await waitForNextUpdate();

    // Then
    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBe("");
    expect(result.current.nextPage).toBe(1);
    expect(result.current.hasMore).toBe(true);
  });

  test("sets error when fetch fails", async () => {
    // Given
    const errorMessage = "Failed to fetch products";
    server.use(
      rest.get(`${process.env.REACT_APP_API_HOST}/products`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: errorMessage }));
      })
    );

    // When
    const { result, waitForNextUpdate } = renderHook(() => useProductsApi());
    await waitForNextUpdate();

    // Then
    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.nextPage).toBe(1);
    expect(result.current.hasMore).toBe(true);
  });

  test("fetches and returns products based on search term", async () => {
    // Given
    server.use(
      rest.get(`${process.env.REACT_APP_API_HOST}/products`, (req, res, ctx) => {
        const searchTerm = req.url.searchParams.get("title_like");
        if (searchTerm === "test") {
          return res(ctx.json([mockProducts[0]]));
        } else {
          return res(ctx.json(mockProducts));
        }
      })
    );

    // When
    const { result, waitForNextUpdate } = renderHook(() =>
        useProductsApi("test", undefined, undefined, 1, 1)
    );
    await waitForNextUpdate();

    // Then
    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual([mockProducts[0]]);
    expect(result.current.error).toBe("");
    expect(result.current.nextPage).toBe(1);
    expect(result.current.hasMore).toBe(true);
  });

  test("loads more products", async () => {
    // Given
    const secondPageProducts: Product[] = [
      {
        id: 4,
        slug: "product-4",
        image_src: "product-4.jpg",
        title: "Product 4",
        vendor: "Vendor 4",
        published: true,
        tags: ["tag5", "tag6"],
        option_value: "option3",
        price: 30,
        sku: "SKU789",
        subscription_discount: 0.3,
        url: "/product-4",
      },
    ];

    server.use(
      rest.get(`${process.env.REACT_APP_API_HOST}/products`, (req, res, ctx) => {
        const page = req.url.searchParams.get("_page");
        if (page === "2") {
          return res(ctx.json(secondPageProducts));
        } else {
          return res(ctx.json(mockProducts));
        }
      })
    );

    // When
    const { result, waitForNextUpdate } = renderHook(() => useProductsApi());
    await waitForNextUpdate(); // Fetch initial page
    result.current.loadMore(); // Load second page
    await waitForNextUpdate();

    // Then
    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual([...mockProducts, ...secondPageProducts]);
    expect(result.current.error).toBe("");
    expect(result.current.nextPage).toBe(2);
    expect(result.current.hasMore).toBe(false);
  });
});
