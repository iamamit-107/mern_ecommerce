import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderById,
  resetPayOrder,
  resetSingleOrder,
  updatePay,
} from "../redux/reducers/orderReducer";
import { Loader } from "../components/Loader";
import Message from "../components/Message";
import axios from "axios";
import { toast } from "react-toastify";
import Helmet from "react-helmet";

const OrderScreen = ({ history }) => {
  const { id } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const {
    singleOrder,
    singleOrderSuccess,
    loading,
    error,
    payOrder,
    payOrderSuccess,
    payOrderLoading,
  } = useSelector((state) => state.orders);

  const {
    loginInfo: { isAdmin, token },
  } = useSelector((state) => state.loginUser);

  useEffect(() => {
    const getPaypalSdkReady = async () => {
      const { data: paypalId } = await axios.get("/api/config/paypal");

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${paypalId}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!singleOrder || payOrderSuccess || singleOrder._id !== id) {
      dispatch(resetPayOrder());
      dispatch(getOrderById(id));
    } else if (!singleOrder.isPaid) {
      if (!window.paypal) {
        getPaypalSdkReady();
      } else {
        setSdkReady(true);
      }
    }
  }, [id, dispatch, singleOrder, payOrderSuccess]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(updatePay({ id, paypalResult: paymentResult }));
    dispatch(resetSingleOrder());
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  const handleDelivered = async () => {
    try {
      const { data } = await axios.put(
        `/api/orders/${id}/delivered`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data) {
        toast.success("Delivered!");
        history.push("/admin/orders");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    singleOrderSuccess && (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Order Page</title>
        </Helmet>
        <h1>Order {singleOrder._id}</h1>

        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {singleOrder.user.name}
                </p>
                <p>
                  <strong>Email: </strong>{" "}
                  <a href={`mailto:${singleOrder.user.email}`}>
                    {singleOrder.user.email}
                  </a>
                </p>
                <p>
                  <strong>Address:</strong>
                  {singleOrder.shippingAddress.address},{" "}
                  {singleOrder.shippingAddress.city}{" "}
                  {singleOrder.shippingAddress.postalCode},{" "}
                  {singleOrder.shippingAddress.country}
                </p>
                {singleOrder.isDelivered ? (
                  <Message variant="success">
                    Delivered on {singleOrder.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {singleOrder.paymentMethod}
                </p>
                {singleOrder.isPaid ? (
                  <Message variant="success">
                    Paid on {singleOrder.paidAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {singleOrder.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {singleOrder.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>
                      $
                      {singleOrder.orderItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${singleOrder.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${singleOrder.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${singleOrder.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {singleOrder && !singleOrder.isPaid && (
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        {payOrderLoading && <Loader />}

                        <PayPalButton
                          amount={singleOrder.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                {isAdmin && singleOrder.isPaid && !singleOrder.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      onClick={handleDelivered}
                      className={`btn btn-block`}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  );
};

export default OrderScreen;
