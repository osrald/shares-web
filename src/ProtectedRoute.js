import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(rest) => {
        if (Auth.isAuthenticated()) {
          return <Component props={rest} />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: rest.location } }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
