import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import useAuth from '../hooks/useAuth';

function Header() {
  const {isLoggedIn, logoutUser} = useAuth();

  return (
    <React.Fragment>
      {isLoggedIn() &&
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand as={Link} to="/">
          Task List App
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">List Tasks</Nav.Link>
        <Nav.Link as={Link} to="/add-task">Add Task</Nav.Link>
        <Nav.Link><div onClick={logoutUser}>Logout</div></Nav.Link>
      </Nav>
    </Navbar>
      }
    </React.Fragment>
  );
}

export default Header;
