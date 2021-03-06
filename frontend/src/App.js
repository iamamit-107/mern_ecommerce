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
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UsersListScreen";
import AdminProtectedRoutes from "./protectedRotes/AdminProtectedRoutes";
import UserProtectedRoutes from "./protectedRotes/UserProtectedRoutes";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route path="/product/:id" component={ProductScreen} exact />
            <Route path="/cart" component={CartScreen} exact />
            <Route path="/login" component={LoginScreen} exact />
            <Route path="/register" component={RegisterScreen} exact />

            {/* User protected routes */}
            <UserProtectedRoutes
              path="/profile"
              component={ProfileScreen}
              exact
            />
            <UserProtectedRoutes
              path="/checkout"
              component={ShippingScreen}
              exact
            />
            <UserProtectedRoutes
              path="/payment"
              component={PaymentScreen}
              exact
            />
            <UserProtectedRoutes
              path="/placeorder"
              component={PlaceOrderScreen}
              exact
            />
            <UserProtectedRoutes
              path="/order/:id"
              component={OrderScreen}
              exact
            />

            {/* admin protected routes */}
            <AdminProtectedRoutes
              path="/admin/user-list"
              component={UserListScreen}
              exact
            />
            <AdminProtectedRoutes
              path="/admin/user/:id/edit"
              component={UserEditScreen}
              exact
            />
            <AdminProtectedRoutes
              path="/admin/products"
              component={ProductListScreen}
              exact
            />
            <AdminProtectedRoutes
              path="/admin/products/:pageNumber"
              component={ProductListScreen}
              exact
            />
            <AdminProtectedRoutes
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
              exact
            />
            <AdminProtectedRoutes
              path="/admin/orders"
              component={OrderListScreen}
              exact
            />
          </Container>
        </main>
        <Footer />

        <ToastContainer theme="colored" autoClose={3000} />
      </Router>
    </>
  );
}

export default App;
