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
import SearchProductsResultsScreen from '../../screens/client/search-products-results/SearchProductsResultsScreen';
import ClientProductDetailsScreen from '../../screens/client/client-product-details/ProductDetailsScreen';
import ProcessOrderScreen from '../../screens/client/process-order/ProcessOrderScreen';
import AdminOrdersScreen from '../../screens/admin/admin-orders/AdminOrdersScreen';
import AdminOrderDetailsScreen from '../../screens/admin/admin-order-details/AdminOrderDetailsScreen';
import ClientOrderDetailsScreen from '../../screens/client/client-order-details/ClientOrderDetailsScreen';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/products" component={SearchProductsResultsScreen} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
        <Route path="/cart" component={ShoppingCartScreen} exact />
        <AdminRoute path="/orders" component={AdminOrdersScreen} exact />
        <AdminRoute
          path="/admin/orders/:id"
          component={AdminOrderDetailsScreen}
          exact
        />
        <ClientRoute path="/orders/personal" component={OrdersScreen} exact />
        <ClientRoute
          path="/orders/:id"
          component={ClientOrderDetailsScreen}
          exact
        />
        <ClientRoute
          path="/orders/process"
          component={ProcessOrderScreen}
          exact
        />
        <AdminRoute path="/dashboard" component={DashboardScreen} exact />
        <AdminRoute path="/admins" component={AdminsScreen} exact />
        <AdminRoute path="/admins/add" component={RegisterAdminScreen} exact />
        <AdminRoute path="/products/add" component={AddProductScreen} exact />
        <Route
          path="/products/:id"
          component={ClientProductDetailsScreen}
          exact
        />
        <AdminRoute
          path="/admin/products/:id/edit"
          component={EditProductScreen}
          exact
        />
        <AdminRoute
          path="/admin/products/:id"
          component={AdminProductDetailsScreen}
          exact
        />
      </Switch>
    </>
  );
};

export default Routes;
