import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };
  
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Lenora
            </Navbar.Brand>
            <Nav className="me-auto">
              {token ? (
                <>
                  <Nav.Link as={Link} to="/" className="nav-link">Barcodes</Nav.Link>
                  <Nav.Link as={Link} to="/add-barcode" className="nav-link">Add Barcode</Nav.Link>
                  <Nav.Link as={Link} to="/patients" className="nav-link">Patients</Nav.Link>
                  <Nav.Link as={Link} to="/add-patient" className="nav-link">Add Patient</Nav.Link>
                  <Nav.Link as={Link} to="/doctors" className="nav-link">Doctors</Nav.Link>
                  <Nav.Link as={Link} to="/add-doctor" className="nav-link">Add Doctor</Nav.Link>
                  <Nav.Link as={Link} to="/examinations" className="nav-link">Examinations</Nav.Link>
                  <Nav.Link as={Link} to="/add-examination" className="nav-link">Add Examination</Nav.Link>
                  <Nav.Link as={Link} to="/medicines" className="nav-link">Medicines</Nav.Link>
                  <Nav.Link as={Link} to="/add-medicine" className="nav-link">Add Medicine</Nav.Link>
                  <Nav.Link onClick={handleLogout} className="nav-link">Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  };

export default Header;
