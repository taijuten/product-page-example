import React from "react";
import { Badge } from "react-bootstrap";

interface ProductTagProps {
    tag: string;
}

const ProductTag: React.FC<ProductTagProps> = ({ tag }) => {
    return <Badge className="mx-1" bg="secondary">{tag}</Badge>
};

export default ProductTag;


