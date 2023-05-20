import { useEffect, useState } from "react";
import { Product } from "../types/products";

const API_HOST = process.env.REACT_APP_API_HOST;

interface ProductState {
  products: Product[];
  error: string;
  loading: boolean;
}

function useProductCollection(searchTerm?: string): ProductState {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        let url = `${API_HOST}/products`;
        if (searchTerm) {
          url += `?title_like=${searchTerm}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return { products, error, loading };
}

export default useProductCollection;
