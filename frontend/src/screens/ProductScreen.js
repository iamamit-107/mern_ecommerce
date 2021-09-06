import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Ratings from "../components/Ratings";
import { fetchSingleProduct } from "../redux/reducers/productDetailsReducer";
import { addToCart } from "../redux/reducers/cartReducer";
import { toast } from "react-toastify";
import Message from "../components/Message";
import axios from "axios";
import Helmet from "react-helmet";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [addReviewLoading, setAddReviewLoading] = useState(false);

  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: cartError } = useSelector((state) => state.cartList);
  const {
    loginInfo: { name, token },
  } = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ id, qty }));
  };

  useEffect(() => {
    if (cartError) {
      toast.warning(cartError);
    }
    if (success) {
      toast.success("Successfully added to cart!");
    }
  }, [cartError, success]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setAddReviewLoading(true);
    try {
      const { data } = await axios.post(
        `/api/products/${id}/review`,
        { rating, comment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data) {
        dispatch(fetchSingleProduct(id));
        setAddReviewLoading(false);
        setRating("");
        setComment("");
      }
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );

      setAddReviewLoading(false);
      setRating("");
      setComment("");
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product Details</title>
      </Helmet>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      <Row>
        <Col md={5}>
          <Image src={product.image} fluid />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Ratings
                value={product.rating}
                totalRating={product.numReviews}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    {product.countInStock > 0 ? `In Stock` : `Out of Stock`}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>QTY: </Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(parseInt(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Row>
                  <Button
                    className="btn btn-dark"
                    disabled={product.countInStock === 0}
                    onClick={() => handleAddToCart()}
                  >
                    Add to Cart
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={6}>
          {product && product.review && (
            <>
              <h2>Reviews</h2>
              {product.review && product.review.length === 0 && (
                <Message>No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.review.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Ratings value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {name ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={addReviewLoading}
                  >
                    Submit{" "}
                    {addReviewLoading && (
                      <Spinner animation="border" role="status" size="sm" />
                    )}
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review{" "}
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
