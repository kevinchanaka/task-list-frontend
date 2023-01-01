import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAppDispatch, useAppSelector } from "hooks";
import { logoutUser, selectIsLoggedIn } from "redux/auth";

export default function Header() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand as={Link} to="/">
          Task List App
        </Navbar.Brand>
        <Nav className="mr-auto">
          {isLoggedIn ? (
            <>
              <Nav.Link as={Link} to="/">
                List Tasks
              </Nav.Link>
              <Nav.Link as={Link} to="/add-task">
                Add Task
              </Nav.Link>
              <Nav.Link as={Link} to="/labels">
                Labels
              </Nav.Link>
              <Nav.Link as={Link} to="/add-label">
                Add Label
              </Nav.Link>
              <Nav.Link>
                <div onClick={() => dispatch(logoutUser())}>Logout</div>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
}
