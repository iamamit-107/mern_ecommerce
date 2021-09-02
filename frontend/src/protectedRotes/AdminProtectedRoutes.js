import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminProtectedRoutes({ component: Component, ...restOfProps }) {
  const {
    loginInfo: { isAdmin },
  } = useSelector((state) => state.loginUser);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAdmin ? <Component {...props} /> : <Redirect to="/profile" />
      }
    />
  );
}

export default AdminProtectedRoutes;
