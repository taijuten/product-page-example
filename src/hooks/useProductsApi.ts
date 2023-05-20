import { useEffect, useState } from "react";
import { Product } from "../types/products";

const API_HOST = process.env.REACT_APP_API_HOST;

interface ProductState {
  products: Product[];
  error: string;
  loading: boolean;
  nextPage: number;
  hasMore: boolean;
  loadMore: Function;
}

function useProductsApi(
  searchTerm?: string,
  min?: number,
  max?: number,
  page = 1,
  limit = 9
): ProductState {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<number>(page);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setProducts([]);
    setNextPage(1);
    setHasMore(true);
  }, [searchTerm, min, max]);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        let url = `${API_HOST}/products?_page=${nextPage}&_limit=${limit}`;
        if (searchTerm) {
          url += `&title_like=${searchTerm}`;
        }
        if (min !== undefined) {
          url += `&price_gte=${min}`;
        }
        if (max !== undefined) {
          url += `&price_lte=${max}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        if (nextPage === 1) {
          setProducts(data);
        } else {
          setProducts((prevProducts) => {
            // Replace items from the current page
            const updatedProducts = [...prevProducts];
            const startIdx = (nextPage - 1) * limit;
            const endIdx = startIdx + data.length;
            updatedProducts.splice(startIdx, endIdx - startIdx, ...data);
            return updatedProducts;
          });
        }
        setLoading(false);
        setHasMore(data.length >= limit);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, nextPage, limit, min, max]);

  const loadMore = () => {
    setNextPage((prevPage) => prevPage + 1);
  };

  return { products, error, loading, nextPage, hasMore, loadMore };
}

export default useProductsApi;
