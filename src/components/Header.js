import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header() {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand as={Link} to="/">
          Task List App
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">List Tasks</Nav.Link>
        <Nav.Link as={Link} to="/add-task">Add Task</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Header;
