import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// logo
import logo from "../panpan-the-bun.svg";

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  return (
    <Navbar bg="secondary" variant="light" expand="md" sticky="top" style = {{padding: "0.5rem 2rem"}}>
      <Navbar.Brand as={Link} to="/">
        <img src={logo} alt="logo" height="50" style={{ marginRight: "0.5rem" }} />
        Panpan the Bun
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/diaries">Diaries</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/epanpan">
            <FontAwesomeIcon icon={faExclamation} style={{ marginRight: '0.5rem' }} />
                EPanpan
            </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
