import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function HomePage() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">My Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/diaries">Diaries</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/epanpan">EPanpan</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h1>Welcome to my website!</h1>
    </div>
  );
}

export default HomePage;
