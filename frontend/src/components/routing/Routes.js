import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
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
        </Switch>
      </Container>
    </>
  );
};

export default Routes;
