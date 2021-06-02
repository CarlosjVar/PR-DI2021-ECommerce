import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Row,
  Card,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { showAlert } from '../../../actions/alertActions';
import { registerAdmin } from '../../../actions/adminActions';

const RegisterAdminScreen = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    password: '',
    passwordConfirmation: '',
  });

  const { email, fullname, password, passwordConfirmation } = formData;

  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      history.push('/');
    }
  }, [history, isAdmin, isAuthenticated, dispatch]);

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      dispatch(
        showAlert({
          type: 'danger',
          message: 'Ambas contraseñas deben coincidir',
        })
      );
    } else {
      dispatch(registerAdmin(formData, history));
    }
  };

  return (
    <Row>
      <Col md="6" className="mx-auto">
        <Card>
          <Card.Body>
            <h4 className="text-center mt-3 mb-4">
              <i className="fa fa-plus"></i> Crear Administrador
            </h4>
            <form onSubmit={onRegisterSubmit}>
              {/* Email Input */}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="email-addon">
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
                  aria-describedby="email-addon"
                />
              </InputGroup>
              {/* Full name */}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="fullName-addon">
                    <i className="fa fa-user"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Nombre y apellidos"
                  type="text"
                  name="fullname"
                  value={fullname}
                  onChange={onInputChange}
                  aria-label="fullname"
                  aria-describedby="fullName-addon"
                />
              </InputGroup>
              {/* Password input */}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="password-addon">
                    <i className="fa fa-asterisk"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Contraseña"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  aria-label="password"
                  aria-describedby="password-addon"
                />
              </InputGroup>
              {/* Password confirmation */}
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="passwordConfirmation-addon">
                    <i className="fa fa-asterisk"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Confirmar contraseña"
                  type="password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={onInputChange}
                  aria-label="passwordConfirmation"
                  aria-describedby="passwordConfirmation-addon"
                />
              </InputGroup>

              <Button type="submit" bg="primary" className="btn-block">
                <i className="fa fa-user-plus"></i> Crear administrador
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterAdminScreen;
