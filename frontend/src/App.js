import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import setAuthenticationToken from './utils/setAuthenticationToken';
import { logoutUser, loadUser } from './actions/authActions';
import store from './store';

import MainNavbar from './components/layout/MainNavbar';
import MainFooter from './components/layout/MainFooter';
import Routes from './components/routing/Routes';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthenticationToken(localStorage.token);
      store.dispatch(loadUser());
    }
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        store.dispatch(logoutUser());
      }
    });
  }, []);

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
