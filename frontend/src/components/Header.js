import React from "react";
import { Route } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/loginReducer";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { resetOrderList } from "../redux/reducers/orderReducer";
import { resetUser } from "../redux/reducers/userDetailsReducer";
import { resetUserList } from "../redux/reducers/userListReducer";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    loginInfo: { name, isAdmin },
  } = useSelector((state) => state.loginUser);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetOrderList());
    dispatch(resetUser());
    dispatch(resetUserList());
    toast.success("User Logged Out!");
    history.push("/");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
              <LinkContainer to="/cart" className="nav-item">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" /> Cart
                </Nav.Link>
              </LinkContainer>
              {name ? (
                <NavDropdown title={name} id="username" drop="left">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user" />
                    Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {isAdmin && (
                <NavDropdown title="Admin" id="username" drop="left">
                  <LinkContainer to="/admin/user-list">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
