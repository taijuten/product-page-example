import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useProductSearch = (handleSearchQuery: (query: string) => void) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query") || "";
    handleSearchQuery(query);
  }, [location.search, handleSearchQuery]);

  const updateSearchQuery = (query: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("query", query);
    navigate({ search: searchParams.toString() });
  };

  return { updateSearchQuery };
};

export default useProductSearch;
