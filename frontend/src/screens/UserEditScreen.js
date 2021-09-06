import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { toast } from "react-toastify";
import Helmet from "react-helmet";

const UserEditScreen = ({ history }) => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);

  const {
    loginInfo: { token },
  } = useSelector((state) => state.loginUser);

  useEffect(() => {
    const getUserById = async () => {
      const { data } = await axios.get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setEmail(data.email);
      setName(data.name);
      setIsAdmin(data.isAdmin);
    };

    setLoading(true);
    getUserById();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const { data } = await axios.put(
        `/api/users/${id}`,
        { name, email, isAdmin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User info updated successfully");
      history.push("/admin/user-list");
      setUpdateLoading(false);
    } catch (error) {
      toast.error(error.message);
      setUpdateLoading(false);
    }
  };

  console.log(isAdmin);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin User edit</title>
      </Helmet>
      <Link to="/admin/user-list" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading && <Loader />}
        {/* {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="isadmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type="submit" variant="primary" disabled={updateloading}>
            Update{" "}
            {updateloading && (
              <Spinner animation="border" role="status" size="sm" />
            )}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
