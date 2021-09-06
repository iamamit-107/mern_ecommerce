import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Product from "../components/Product";
import { fetchProducts } from "../redux/reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { keyword } = useParams();
  const { pageNumber = 1 } = useParams();

  const dispath = useDispatch();
  const { products, loading, error, pages, page } = useSelector(
    (state) => state.productLists
  );

  useEffect(() => {
    dispath(fetchProducts({ keyword, pageNumber }));
  }, [dispath, keyword, pageNumber]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Welcome to Proshop</title>
      </Helmet>
      <Row>
        {!keyword && <ProductCarousel />}
        <h2 className="mt-5">Products</h2>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={3}>
            <Product product={product} />
          </Col>
        ))}

        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
      </Row>
    </>
  );
};

export default HomeScreen;
