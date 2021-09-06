import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Form, Button, Row, Col, Toast, Spinner } from "react-bootstrap";
import Message from "../components/Message";
import { Loader } from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { registerUser } from "../redux/reducers/registerReducer";
import { toast } from "react-toastify";

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.registerUser);
  const { loading, error, registerInfo } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));

    setName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (registerInfo.name) {
      history.push("/");
      toast.success("Registration Successfull!");
    }
  }, [registerInfo]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register User</title>
      </Helmet>
      <FormContainer>
        <h1 className="text-center">Sign Up</h1>
        {error && <Message variant="danger">{error}</Message>}

        <Form onSubmit={submitHandler} autoComplete="off">
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3"
              autoComplete="off"
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

          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            disabled={loading}
          >
            Sign Up{" "}
            {loading && <Spinner animation="border" role="status" size="sm" />}
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Already have an account ? <Link to={`/login`}>Sign In</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
