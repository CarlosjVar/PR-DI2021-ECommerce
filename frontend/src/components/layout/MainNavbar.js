import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const MainNavbar = () => {
  return (
    <Navbar bg="primary" navbar="dark" expand="md">
      <Container>
        <Navbar.Brand className="text-white" href="#">
          CompuHardware
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
