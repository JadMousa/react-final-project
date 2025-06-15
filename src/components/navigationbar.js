// src/components/NavigationBar.js
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


    function NavigationBar() {
      return (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">📚 Library App</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/books">Books</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }

export default NavigationBar;
