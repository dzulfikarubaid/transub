// AuthRoute.js
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = ({ component: Component, authenticated, ...rest }:any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/app" />
        )
      }
    />
  );
};

export default AuthRoute;
