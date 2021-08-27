import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { fetchProducts } from "../redux/reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispath = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productLists
  );

  useEffect(() => {
    dispath(fetchProducts());
  }, [dispath]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <Row>
      {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={3}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default HomeScreen;
