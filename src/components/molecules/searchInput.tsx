import React, { ChangeEvent } from "react";
import { FormGroup, Form } from "react-bootstrap";
interface SearchInputProps {
  onChange: Function,
  searchQuery: string
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange, searchQuery }) =>
    <FormGroup className="mb-3">
    <Form.Label htmlFor="search">Search</Form.Label>
    <Form.Control
        id="search"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
    </FormGroup>
;

export default SearchInput;
