import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Image, Form } from "react-bootstrap";
import Message from "../components/Message";
import { toast } from "react-toastify";
import { updateCart } from "../redux/reducers/cartReducer";

const CartScreen = () => {
  const { cart, success } = useSelector((state) => state.cartList);
  const dispatch = useDispatch();

  const handleUpdateCart = (id, qty) => {
    dispatch(updateCart({ id, qty }));
    toast.success("Cart Successfully Updated!");
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
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col md={4}>{item.name}</Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
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
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
