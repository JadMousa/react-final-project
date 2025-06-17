// src/components/NavigationBar.js
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from './loginbutton';
import LogoutButton from './logoutbutton';
import UserProfile from './userprofile';


    function NavigationBar() {
      const { user, isAuthenticated } = useAuth0();

      return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand as={Link} to="/">📚 Library App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/books">Books</Nav.Link>
              </Nav>
              <Nav className="align-items-center">
              {isAuthenticated ? (
                  <>
                    {user?.email === "jadmousa12@gmail.com" && (
                      <Nav.Link as={Link} to="/my-books">📘 My Books</Nav.Link>
                    )}
                    <Nav.Link as={Link} to="/account">
                      <img
                        src={user.picture}
                        alt="Profile"
                        style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                      />
                    </Nav.Link>
                    <LogoutButton />
                  </>
                ) : (
                  <LoginButton />
                )}
         </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        );
      }

export default NavigationBar;
