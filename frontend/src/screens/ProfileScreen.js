import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  updateUserProfile,
} from "../redux/reducers/userDetailsReducer";
import { Loader } from "../components/Loader";
import Message from "../components/Message";
import { getMyOrders } from "../redux/reducers/orderReducer";
import Helmet from "react-helmet";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.loginUser);
  const { loginInfo } = userLogin;

  const { orderLists, orderListLoading, orderListSuccess, orderListError } =
    useSelector((state) => state.orders);

  useEffect(() => {
    if (!loginInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserProfile("profile"));
        dispatch(getMyOrders(""));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, loginInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserProfile({ name, email, password }));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile Page</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}

          {error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3"
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3"
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3"
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary" disabled={loading}>
                Update{" "}
                {loading && (
                  <Spinner animation="border" role="status" size="sm" />
                )}
              </Button>
            </Form>
          )}
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {orderListLoading ? (
            <Loader />
          ) : orderListError ? (
            <Message variant="danger">{orderListError}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orderLists.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
