import React from "react";
import { Card } from "react-bootstrap";

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) =>
  <Card.Img className="lazy-image" src={src} alt={alt} loading="lazy" />;


export default LazyImage;
