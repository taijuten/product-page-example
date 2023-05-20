import React from "react";
import LazyImage from "../atoms/lazyImage";
import { Product } from "../../types/products";
import { Button, Card } from "react-bootstrap";
import ProductDetails from "../molecules/productDetails";
import ProductTag from "../atoms/productTag";

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    return (
        <Card className="mb-5">
            <LazyImage src={product.image_src} alt="Product Image" />
            <Card.Body>
                <ProductDetails product={product} />
                <Button variant="primary" className="float-end" href={product.url}>Buy Now</Button>
            </Card.Body>
            <Card.Footer className="d-flex flex-row-reverse">
                {product.tags.map(tag => <ProductTag key={`product_${product.id}_tag_${tag}`} tag={tag} />)}
            </Card.Footer>
        </Card>
    );
};

export default ProductItem;
