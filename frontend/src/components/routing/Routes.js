import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import OrdersScreen from '../../screens/OrdersScreen';
import ShoppingCartScreen from '../../screens/ShoppingCartScreen';
import DashboardScreen from '../../screens/DashboardScreen';
import AdminsScreen from '../../screens/AdminsScreen';
import Alert from '../layout/Alert';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
      </Switch>
      <Container className="pt-4">
        <Alert />
        <Switch>
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/cart" component={ShoppingCartScreen} exact />
          <Route path="/my-orders" component={OrdersScreen} exact />
          <Route path="/dashboard" component={DashboardScreen} exact />
          <Route path="/admins" component={AdminsScreen} exact />
        </Switch>
      </Container>
    </>
  );
};

export default Routes;
