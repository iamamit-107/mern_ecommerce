import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { toast } from "react-toastify";
import { removeCart, updateCart } from "../redux/reducers/cartReducer";
import { Link, useHistory } from "react-router-dom";

const CartScreen = () => {
  const { cart, success } = useSelector((state) => state.cartList);
  const { loginInfo } = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUpdateCart = (id, qty) => {
    dispatch(updateCart({ id, qty }));
    toast.success("Cart Successfully Updated!");
  };

  const handleDeleteCart = (id) => {
    dispatch(removeCart(id));
    toast.warning("Successfully Removed From Cart!");
  };

  const checkoutHandler = () => {
    if (loginInfo.name) {
      history.push("/checkout");
    } else {
      history.push("/login");
    }
  };
  return (
    <div>
      <Row>
        <Col md={8}>
          {cart.length === 0 ? (
            <Message variant="danger">Your Cart is Empty</Message>
          ) : (
            <ListGroup variant="flush">
              {cart.map((item) => (
                <ListGroup.Item>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={10}
                        onChange={(e) =>
                          handleUpdateCart(
                            item.product,
                            parseInt(e.target.value)
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="dark"
                        onClick={() => handleDeleteCart(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cart.reduce((acc, item) => acc + item.qty, 0)})
                  items
                </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                Total Price : $
                {cart
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
