import React, { useState } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Row,
  Card,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { authenticateUser } from '../actions/authActions';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const { isAuthenticated } = useSelector((state) => state.auth);

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(authenticateUser(formData, history));
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const { email, password } = formData;

  return (
    <Row>
      <Col md="6" className="mx-auto">
        <Card>
          <Card.Body>
            <h3 className="text-center mt-3 mb-4">
              <i className="fas fa-sign-in-alt"></i> Login
            </h3>
            <form onSubmit={onLoginSubmit}>
              {/* Email Input */}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <i className="fa fa-envelope"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  aria-label="email"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              {/* Password input */}
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="password-addon">
                    <i className="fa fa-asterisk"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  aria-label="password"
                  aria-describedby="password-addon"
                />
              </InputGroup>

              <div className="link-wrapper">
                <Link id="register-link" to="/register">
                  Registrarme
                </Link>
              </div>

              <Button type="submit" bg="primary" className="btn-block">
                <i className="fas fa-sign-in-alt"></i> Login
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginScreen;
