import React from "react";
import { Card } from "react-bootstrap";
import Ratings from "./Ratings";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3">
      <a href={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </a>

      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>

        <Card.Text as="div">
          <div className="my-3">
            <Ratings value={product.rating} totalRating={product.numReviews} />
          </div>
        </Card.Text>

        <Card.Text as="h3">$ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
