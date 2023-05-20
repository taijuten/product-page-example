import React, { ChangeEvent } from "react";
import { FormGroup, Form, Col, Row } from "react-bootstrap";
interface PriceFilterInputProps {
  onMaxChange: Function,
  onMinChange: Function,
  min: number,
  max: number
}

const PriceFilterInput: React.FC<PriceFilterInputProps> = ({ onMaxChange, onMinChange, max= 1000, min = 0 }) =>
  <FormGroup className="mb-3">
    <Row>
      <Col xs={12} md={6}>
        <Form.Label htmlFor="min">Min Price</Form.Label>
        <Form.Control
          id="min"
            type="number"
            step={1}
            min={0}
            max={1000}
            value={min}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onMinChange(e.target.value)}
        />
      </Col>
      <Col xs={12} md={6}>
        <Form.Label htmlFor="max">Max Price</Form.Label>
          <Form.Control
            id="max"
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

export default PriceFilterInput;
