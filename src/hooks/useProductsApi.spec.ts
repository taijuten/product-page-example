import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import useProductCollection from "./useProductsApi";

// Mock API response
const mockProducts = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
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

describe("useProductCollection", () => {
  test("returns initial loading state", () => {
    // When
    const { result } = renderHook(() => useProductCollection());

    // Then
    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe("");
  });

  test("fetches and returns products", async () => {
    // Given
    server.use(
      rest.get(`${process.env.REACT_APP_API_HOST}/products`, (req, res, ctx) => {
        return res(ctx.json(mockProducts));
      })
    );

    // When
    const { result, waitForNextUpdate } = renderHook(() => useProductCollection());
    await waitForNextUpdate();

    // Then
    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBe("");
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
    const { result, waitForNextUpdate } = renderHook(() => useProductCollection());
    await waitForNextUpdate();

    // Then
    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });
});
