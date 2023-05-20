import React from "react";
import useProductCollection from "../../hooks/useProductsApi";
import ProductItem from "../../components/organisms/productCard";
import { Col, Row } from "react-bootstrap";

const ProductList: React.FC = () => {
  const { products, error, loading } = useProductCollection();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Products</h1>
      <h6>Showing {products.length} products</h6>
      <Row>
        {products.map((product) => (
          <Col xs={12} md={6} lg={4} key={`product_${product.id}`}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductList;