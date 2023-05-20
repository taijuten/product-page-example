import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Product } from "../../types/products";
import CardPrice from "../atoms/cardPrice";

interface ProductDetailsProps {
  product: Product
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) =>
    <Row>
        <Col xs={12}>
            <Card.Title>{product.title}</Card.Title>
        </Col>
        <Col xs={12} md={6}>
            <Card.Subtitle>{product.vendor}</Card.Subtitle>
            <Card.Text>{product.option_value}</Card.Text>
        </Col>
        <Col xs={12} md={6}>
            <CardPrice price={product.price} discount={product.subscription_discount} />
        </Col>
    </Row>
;

export default ProductDetails;
