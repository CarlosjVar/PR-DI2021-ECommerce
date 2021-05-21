import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import OrdersScreen from '../../screens/OrdersScreen';
import ShoppingCartScreen from '../../screens/ShoppingCartScreen';
import Alert from '../layout/Alert';

const Routes = () => {
  return (
    <>
      <Route path="/" component={HomeScreen} exact />
      <Container>
        <Alert />
        <Switch>
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/cart" component={ShoppingCartScreen} exact />
          <Route path="/my-orders" component={OrdersScreen} exact />
        </Switch>
      </Container>
    </>
  );
};

export default Routes;
