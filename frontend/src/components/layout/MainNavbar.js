import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const MainNavbar = () => {
  return (
    <Navbar bg="primary" className="navbar-dark" expand="md">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-white">CompuHardware</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          className="text-white"
          aria-controls="responsive-navbar"
        />
        <Navbar.Collapse id="responsive-navbar">
          <Nav className="ml-auto">
            <Nav.Item>
              <Link to="/" className="nav-link">
                <i className="fa fa-home"></i> Inicio
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/" className="nav-link">
                <i className="fas fa-shopping-cart"></i> Carrito
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/register" className="nav-link">
                <i className="fas fa-user-plus"></i> Registrarse
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/login" className="nav-link">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
