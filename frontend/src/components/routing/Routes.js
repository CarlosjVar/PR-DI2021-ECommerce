import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminRoute from './AdminRoute';
import ClientRoute from './ClientRoute';

import HomeScreen from '../../screens/client/home/HomeScreen';
import LoginScreen from '../../screens/shared/LoginScreen';
import RegisterScreen from '../../screens/shared/RegisterScreen';
import OrdersScreen from '../../screens/client/client-orders/OrdersScreen';
import ShoppingCartScreen from '../../screens/client/shopping-cart/ShoppingCartScreen';
import DashboardScreen from '../../screens/admin/dashboard/DashboardScreen';
import AdminsScreen from '../../screens/admin/admins/AdminsScreen';
import RegisterAdminScreen from '../../screens/admin/register-admin/RegisterAdminScreen';
import AddProductScreen from '../../screens/admin/add-product/AddProductScreen';
import AdminProductDetailsScreen from '../../screens/admin/admin-product-details/AdminProductDetailsScreen';
import EditProductScreen from '../../screens/admin/edit-product/EditProductScreen';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
        <ClientRoute path="/cart" component={ShoppingCartScreen} exact />
        <ClientRoute path="/my-orders" component={OrdersScreen} exact />
        <AdminRoute path="/dashboard" component={DashboardScreen} exact />
        <AdminRoute path="/admins" component={AdminsScreen} exact />
        <AdminRoute path="/admins/add" component={RegisterAdminScreen} exact />
        <AdminRoute path="/products/add" component={AddProductScreen} exact />
        <AdminRoute
          path="/products/:id"
          component={AdminProductDetailsScreen}
          exact
        />
        <AdminRoute
          path="/products/:id/edit"
          component={EditProductScreen}
          exact
        />
      </Switch>
    </>
  );
};

export default Routes;
