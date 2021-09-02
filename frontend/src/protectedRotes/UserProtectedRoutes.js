import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProtectedRoutes = ({ component: Component, ...restOfProps }) => {
  const {
    loginInfo: { name },
  } = useSelector((state) => state.loginUser);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        name ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default UserProtectedRoutes;
