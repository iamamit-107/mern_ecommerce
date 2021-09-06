import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./Loader";
import Message from "./Message";
import { fetchTopProducts } from "../redux/reducers/productReducer";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { topLoading, topError, topProducts } = useSelector(
    (state) => state.productLists
  );

  useEffect(() => {
    if (!topProducts.length) {
      dispatch(fetchTopProducts());
    }
  }, [dispatch]);

  return topLoading ? (
    <Loader />
  ) : topError ? (
    <Message variant="danger">{topError}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
