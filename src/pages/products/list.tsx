import React from "react";
import { useLocation } from "react-router-dom";
import useProductsApi from "../../hooks/useProductsApi";
import ProductItem from "../../components/organisms/productCard";
import { Button, Col, Row, Container } from "react-bootstrap";
import qs from "query-string";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import ProductFilters from "../../components/organisms/productFilters";

const ProductList: React.FC = () => {
  const location = useLocation();
  const queryParams = qs.parse(location.search);
  const { products, error, loading, hasMore, loadMore } = useProductsApi(
    queryParams.search as string,
    parseInt(queryParams.min as string),
    parseInt(queryParams.max as string),
    queryParams.subscription === "true",
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container className='App py-3'>
      <h1>Products</h1>
      <h6>Showing {products.length} products</h6>
      <Row>
        <Col xs={12} md={4} lg={3}>
          <ProductFilters />
        </Col>
        <Col xs={12} md={8} lg={9}>
          {products.length === 0 && <div>No products found</div>}
          <Row>
            {products.map((product) => (
              <Col sm={12} lg={6} xl={4} key={`product_${product.id}`}>
                <ProductItem product={product} />
              </Col>
            ))}
          </Row>
          {hasMore && (
            <div className="text-center mt-4">
              <Button onClick={() => loadMore()}>Load More</Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
