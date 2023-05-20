import React, { ChangeEvent } from "react";
import { FormGroup, Form, Col, Row } from "react-bootstrap";
interface SearchInputProps {
  onMaxChange: Function,
  onMinChange: Function,
  min: number,
  max: number
}

const SearchInput: React.FC<SearchInputProps> = ({ onMaxChange, onMinChange, max= 1000, min = 0 }) =>
  <FormGroup className="mb-3">
    <Row>
      <Col xs={12} md={6}>
        <Form.Label htmlFor="search">Min Price</Form.Label>
        <Form.Control
            type="number"
            step={1}
            min={0}
            max={1000}
            value={min}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onMinChange(e.target.value)}
        />
      </Col>
      <Col xs={12} md={6}>
        <Form.Label htmlFor="search">Max Price</Form.Label>
          <Form.Control
              type="number"
              step={1}
              min={0}
              max={1000}
              value={max}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onMaxChange(e.target.value)}
          />
      </Col>
    </Row>
  </FormGroup>
;

export default SearchInput;
