import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { loginUser } from "../redux/reducers/loginReducer";
import Message from "../components/Message";
import { Loader } from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { Link, Redirect } from "react-router-dom";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.loginUser);
  const { loading, error, loginInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    console.log(loginInfo);
    if (loginInfo.name) {
      history.push("/");
    }
  }, [loginInfo]);
  return (
    <FormContainer>
      <h1 className="text-center">Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} autoComplete="off">
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3"
            autoComplete="off"
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
            autoComplete="off"
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to={`/register`}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
