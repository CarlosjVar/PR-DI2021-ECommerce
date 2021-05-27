import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import AdminRoute from './AdminRoute';
import ClientRoute from './ClientRoute';

import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import OrdersScreen from '../../screens/OrdersScreen';
import ShoppingCartScreen from '../../screens/ShoppingCartScreen';
import DashboardScreen from '../../screens/DashboardScreen';
import AdminsScreen from '../../screens/AdminsScreen';
import RegisterAdminScreen from '../../screens/RegisterAdminScreen';
import AddProductScreen from '../../screens/AddProductScreen';
import AdminProductDetailsScreen from '../../screens/AdminProductDetailsScreen';
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
          <ClientRoute path="/cart" component={ShoppingCartScreen} exact />
          <ClientRoute path="/my-orders" component={OrdersScreen} exact />
          <AdminRoute path="/dashboard" component={DashboardScreen} exact />
          <AdminRoute path="/admins" component={AdminsScreen} exact />
          <AdminRoute
            path="/admins/add"
            component={RegisterAdminScreen}
            exact
          />
          <AdminRoute path="/products/add" component={AddProductScreen} exact />
          <AdminRoute
            path="/products/:id"
            component={AdminProductDetailsScreen}
            exact
          />
        </Switch>
      </Container>
    </>
  );
};

export default Routes;
