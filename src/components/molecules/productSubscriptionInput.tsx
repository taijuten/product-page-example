import React, { ChangeEvent } from "react";
import { FormGroup, Form, } from "react-bootstrap";
interface ProductSubscriptionInputProps {
  onChange: Function,
  isSelected: boolean,
}

const ProductSubscriptionInput: React.FC<ProductSubscriptionInputProps> = ({ onChange, isSelected = false }) =>
  <FormGroup className="mb-3">
    <Form.Check
      id="subs"
        label="Subscription only"
        type="switch"
        checked={isSelected}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
    />
  </FormGroup>
;

export default ProductSubscriptionInput;
