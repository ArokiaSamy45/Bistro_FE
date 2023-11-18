import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth'; // Import your authentication logic

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Element /> : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;
