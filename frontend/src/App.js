import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";

import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/product/:id" component={ProductScreen} exact />
            <Route path="/cart" component={CartScreen} exact />
            <Route path="/login" component={LoginScreen} exact />
            <Route path="/register" component={RegisterScreen} exact />
            <Route path="/profile" component={ProfileScreen} exact />
            <Route path="/checkout" component={ShippingScreen} exact />
          </Container>
        </main>
        <Footer />

        <ToastContainer theme="colored" autoClose={3000} />
      </Router>
    </>
  );
}

export default App;
