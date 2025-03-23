import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Footer() {
  return (
    <footer
      style={{
        backgroundImage: 'linear-gradient(to right, #1e1e30, #6C63FF)',
        color: '#ffffff',
        padding: '20px 0',
        textAlign: 'center',
        boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              }}
            >
              Copyright &copy; Codashopee 2024
            </span>
          </Col>
        </Row>

        {/* Footer Links */}
        <Row>
          <Col className='text-center'>
            <Link
              to="/contact-us" // Update the path to match your route
              style={{
                color: '#ffffff',
                margin: '0 10px',
                fontWeight: '500',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                fontSize: '1rem',
                transition: 'color 0.3s ease',
                textDecoration: 'none', // Removed underline
              }}
              onMouseEnter={(e) => (e.target.style.color = '#FFD700')}
              onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
            >
              <i className="fa-sharp-duotone fa-solid fa-phone" style={{ marginRight: '5px' }}></i>
              Contact Us
            </Link>
            <Link
              to="/privacy-policy" // Update the path to match your route
              style={{
                color: '#ffffff',
                margin: '0 10px',
                fontWeight: '500',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                fontSize: '1rem',
                transition: 'color 0.3s ease',
                textDecoration: 'none', // Removed underline
              }}
              onMouseEnter={(e) => (e.target.style.color = '#FFD700')}
              onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
            >
              <i className="fa-solid fa-user-lock" style={{ marginRight: '5px' }}></i>
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions" // Update the path to match your route
              style={{
                color: '#ffffff',
                margin: '0 10px',
                fontWeight: '500',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                fontSize: '1rem',
                transition: 'color 0.3s ease',
                textDecoration: 'none', // Removed underline
              }}
              onMouseEnter={(e) => (e.target.style.color = '#FFD700')}
              onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
            >
              <i className="fa-solid fa-file-signature" style={{ marginRight: '5px' }}></i>
              Terms & Conditions
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;