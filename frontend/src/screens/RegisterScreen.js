import React, { useState } from 'react';
import {
  Col,
  Row,
  Card,
  InputGroup,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    passwordConfirmation: '',
  });
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] =
    useState(false);

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    if (!acceptTermsAndConditions) {
    } else if (passwordConfirmation !== password) {
    }
    console.log(formData);
    // TODO: Run action
  };

  const { email, fullName, password, passwordConfirmation } = formData;

  return (
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
                  name="fullName"
                  value={fullName}
                  onChange={onInputChange}
                  aria-label="fullName"
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
                  label="Acepto los terminos y condiciones"
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
  );
};

export default RegisterScreen;
