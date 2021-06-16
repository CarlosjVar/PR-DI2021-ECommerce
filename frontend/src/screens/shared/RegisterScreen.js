import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Row,
  Card,
  InputGroup,
  FormControl,
  Button,
  Form,
  Container,
} from 'react-bootstrap';
import { registerClient } from '../../actions/authActions';
import { showAlert } from '../../actions/alertActions';

import Alert from '../../components/layout/Alert';

const RegisterScreen = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    password: '',
    passwordConfirmation: '',
  });
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] =
    useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    if (!acceptTermsAndConditions) {
      dispatch(
        showAlert({
          message: 'Por favor acepte los términos y condiciones',
          type: 'danger',
        })
      );
    } else if (passwordConfirmation !== password) {
      dispatch(
        showAlert({
          message: 'Ambas contraseñas deben coincidir',
          type: 'danger',
        })
      );
    } else {
      dispatch(registerClient(formData, history));
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const { email, fullname, password, passwordConfirmation } = formData;

  return (
    <Container className="py-5">
      <Alert />
      <Row>
        <Col md="6" className="mx-auto">
          <Card>
            <Card.Body>
              <h4 className="text-center mt-3 mb-4">
                <i className="fas fa-user-plus"></i> Registrarse
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
                {/* Accept terms and conditions */}
                <Form.Group controlId="acceptTermsAndConditions">
                  <Form.Check
                    type="checkbox"
                    label="Acepto los términos y condiciones"
                    className="text-center my-4"
                    onChange={() =>
                      setAcceptTermsAndConditions(!acceptTermsAndConditions)
                    }
                  />
                </Form.Group>
                <Button
                  disabled={!acceptTermsAndConditions}
                  type="submit"
                  bg="primary"
                  className="btn-block"
                >
                  <i className="fa fa-user-plus"></i> Registrarse
                </Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
