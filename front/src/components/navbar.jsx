import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import '../components/navbar.css';


export default function Navigation() {
  return (
    <Navbar expand="lg" className="navbar-dark sticky-top" style={{ backgroundColor: "#4CAF50" }}> {/* Medium green background */}
      <Container fluid className="px-3 px-lg-5"> {/* Improved padding for different screens */}
        {/* Brand Name - Larger on desktop */}
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="fw-bold text-white fs-4 fs-lg-3 nav-text-hover"
        >
          Cropcare
        </Navbar.Brand>

        {/* Toggle Button - Better spacing */}
        <Navbar.Toggle aria-controls="navbarNavDropdown" className="border-0 py-1 px-2" />
        {/* Navigation Links - Improved spacing and dropdown */}
        <Navbar.Collapse id="navbarNavDropdown">
          <Nav className="ms-auto align-items-lg-center"> {/* Better vertical alignment */}
            <Nav.Link 
              as={Link} 
              to="/" 
              className="text-white fw-semibold px-2 px-lg-3 py-3 py-lg-1 nav-text-hover"
              activeClassName="active"
            >
              Home
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/rover" 
              className="text-white fw-semibold px-2 px-lg-3 py-3 py-lg-1 nav-text-hover"
              activeClassName="active"
            >
              Rover
            </Nav.Link>

            {/* Dropdown Menu mobile */}
            <NavDropdown 
              title="More" 
              id="nav-dropdown" 
              className="fw-semibold"
              renderMenuOnMount={true} 
            >
              <NavDropdown.Item 
                as={Link} 
                to="/features" 
                className="py-2 px-3 nav-text-hover"
              >
                Features
              </NavDropdown.Item>
              <NavDropdown.Item 
                as={Link} 
                to="/team" 
                className="py-2 px-3 nav-text-hover"
              >
                Our Team
              </NavDropdown.Item>
              <NavDropdown.Item 
                as={Link} 
                to="/contact" 
                className="py-2 px-3 nav-text-hover"
              >
                Contact Us
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}