import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import qs from "query-string";
import { useNavigate, useLocation } from 'react-router-dom';
import SearchInput from "../molecules/searchInput";

const ProductFilters: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(location.search);
    const [searchQuery, setSearchQuery] = useState(queryParams?.search || "");

    useEffect(() => {
        const updatedQueryParams = { ...queryParams, search: searchQuery };
        const query = qs.stringify(updatedQueryParams);
        navigate(`?${query}`);
    }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Card>
            <Card.Body>
                <Card.Title>Filters</Card.Title>
                <Form>
                    <SearchInput onChange={setSearchQuery} searchQuery={searchQuery as string} />
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ProductFilters;
