import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

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
