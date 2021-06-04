import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Alert from '../layout/Alert';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAdmin ? (
          <Container className="pt-4">
            <Alert />
            <Component {...props} />
          </Container>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AdminRoute;
