import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import '../components/navbar.css';
import { useTranslation } from 'react-i18next';
import '../i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Navigation() {
  const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
  return (
    <Navbar expand="lg" className="navbar-dark sticky-top" style={{ backgroundColor: "#115615" }}> {/* Medium green background */}
      <Container fluid className="px-3 px-lg-5"> {/* Improved padding for different screens */}
        {/* Brand Name - Larger on desktop */}
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="fw-bold text-white fs-4 fs-lg-3 nav-text-hover"
        >
          {t('appName')}
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
              {t('navigation.home')}
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/rover" 
              className="text-white fw-semibold px-2 px-lg-3 py-3 py-lg-1 nav-text-hover"
              activeClassName="active"
            >
              {t('rover.rover')}
            </Nav.Link>

            {/* Dropdown Menu mobile */}
            <NavDropdown 
              title={t('navigation.more')} 
              id="nav-dropdown" 
              className="fw-semibold"
              renderMenuOnMount={true} 
            >
              <NavDropdown.Item 
                as={Link} 
                to="/features" 
                className="py-2 px-3 nav-text-hover"
              >
                {t('navigation.features')}
              </NavDropdown.Item>
              <NavDropdown.Item 
                as={Link} 
                to="/team" 
                className="py-2 px-3 nav-text-hover"
              >
                {t('navigation.ourTeam')}
              </NavDropdown.Item>
              <NavDropdown.Item 
                as={Link} 
                to="/contact" 
                className="py-2 px-3 nav-text-hover"
              >
                {t('navigation.contactUs')}
              </NavDropdown.Item>
            </NavDropdown>
            <div className="language-switcher ms-3">
              <button
                onClick={() => changeLanguage('en')}
                className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
              >
                {t('buttons.english')}
              </button>
              <span className="lang-divider">|</span>
              <button
                onClick={() => changeLanguage('ta')}
                className={`lang-btn ${i18n.language === 'ta' ? 'active' : ''}`}
              >
                {t('buttons.tamil')}
              </button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}