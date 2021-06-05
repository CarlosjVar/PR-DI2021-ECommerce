import React, { useEffect } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import setAuthenticationToken from './utils/setAuthenticationToken';
import { logoutUser, loadUser } from './actions/authActions';
import { loadCartProducts } from './actions/cartActions';
import store from './store';

import MainNavbar from './components/layout/MainNavbar';
import MainFooter from './components/layout/MainFooter';
import Routes from './components/routing/Routes';

const App = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.cart) {
      let productIds = JSON.parse(localStorage.getItem('cart'));
      store.dispatch(loadCartProducts(productIds));
    }
  }, []);

  useEffect(() => {
    if (localStorage.token) {
      setAuthenticationToken(localStorage.token);
    }
    store.dispatch(loadUser(history));
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        store.dispatch(logoutUser());
      }
    });
  }, [history]);

  return (
    <Router>
      <MainNavbar />
      <main>
        <Routes />
      </main>
      <MainFooter />
    </Router>
  );
};

export default App;
