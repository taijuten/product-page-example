import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import qs from "query-string";
import { useNavigate, useLocation } from 'react-router-dom';
import SearchInput from "../molecules/searchInput";
import PriceFilterInput from "../molecules/priceFilterInput";

const ProductFilters: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(location.search);
    const [searchQuery, setSearchQuery] = useState(queryParams?.search || "");
    const [minPrice, setMinPrice] = useState(parseInt(queryParams?.min as string) || 0);
    const [maxPrice, setMaxPrice] = useState(parseInt(queryParams?.max as string) || 1000);

    useEffect(() => {
        const updatedQueryParams = { ...queryParams };
            updatedQueryParams.search = searchQuery;
            updatedQueryParams.min = `${minPrice}`;
            updatedQueryParams.max = `${maxPrice}`;
        const query = qs.stringify(updatedQueryParams);
        navigate(`?${query}`);
    }, [searchQuery, minPrice, maxPrice]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Card>
            <Card.Body>
                <Card.Title>Filters</Card.Title>
                <Form>
                    <SearchInput onChange={setSearchQuery} searchQuery={searchQuery as string} />
                    <PriceFilterInput onMinChange={setMinPrice} onMaxChange={setMaxPrice} min={minPrice} max={maxPrice} />
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ProductFilters;
