import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Use Link for routing

function Header({ isSuperuser }) {
    return (
        <Navbar 
            expand="lg" 
            style={{
                padding: '15px 20px',
                backgroundImage: 'linear-gradient(to right, #1e1e30, #6C63FF)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                borderBottom: '2px solid #6C63FF',
            }}
        >
            <Container>
                {/* Logo */}
                <Navbar.Brand 
                    as={Link} // Use Link for routing
                    to="/" 
                    style={{ 
                        fontWeight: 'bold', 
                        fontSize: '1.8rem', 
                        color: '#FFFFFF',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                    }}
                >
                    LootVault
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Search Bar */}
                    <Form className="mx-auto d-flex" style={{ width: '50%' }}>
                        <FormControl
                            type="search"
                            placeholder="Search for games..."
                            className="me-2"
                            aria-label="Search"
                            style={{
                                borderRadius: '30px',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#282c34',
                                color: '#FFFFFF',
                                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.6)',
                            }}
                        />
                        <Button 
                            variant="outline-light" 
                            style={{
                                borderRadius: '30px',
                                padding: '0.5rem 1.5rem',
                                border: '1px solid #6C63FF',
                                color: '#FFFFFF',
                                backgroundColor: '#6C63FF',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#5A53E8')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = '#6C63FF')}
                        >
                            Search
                        </Button>
                    </Form>

                    {/* Navigation Links */}
                    <Nav className="ms-auto">
                        <Nav.Link 
                            as={Link} // Use Link for routing
                            to="/" 
                            style={{
                                color: '#FFFFFF',
                                fontWeight: '500',
                                marginRight: '15px',
                                transition: 'color 0.3s ease',
                                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onMouseEnter={(e) => (e.target.style.color = '#FFD700')}
                            onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
                        >
                            <i className="fa-sharp-duotone fa-solid fa-house" style={{ marginRight: '5px' }}></i>
                            Home
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} // Use Link for routing
                            to="/about-us" // Updated to /about-us
                            style={{
                                color: '#FFFFFF',
                                fontWeight: '500',
                                marginRight: '15px',
                                transition: 'color 0.3s ease',
                                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onMouseEnter={(e) => (e.target.style.color = '#FFD700')}
                            onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
                        >
                            <i className="fa fa-info-circle" aria-hidden="true" style={{ marginRight: '5px' }}></i>
                            About
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} // Use Link for routing
                            to="/profile"
                            style={{
                                color: '#FFFFFF',
                                fontWeight: '500',
                                marginRight: '15px',
                                transition: 'color 0.3s ease',
                                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onMouseEnter={(e) => (e.target.style.color = '#FFD700')}
                            onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
                        >
                            <i className="fa-sharp-duotone fa-solid fa-circle-user" style={{ marginRight: '5px' }}></i>
                            Profile
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} // Use Link for routing
                            to="/rate-games"
                            style={{
                                color: '#FFFFFF',
                                fontWeight: '500',
                                marginRight: '15px',
                                transition: 'color 0.3s ease',
                                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onMouseEnter={(e) => (e.target.style.color = '#FFD700')}
                            onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
                        >
                            <i className="fa-solid fa-star" style={{ marginRight: '5px' }}></i>
                            Rate LootVault
                        </Nav.Link>
                        {isSuperuser && (
                            <Nav.Link 
                                as={Link} // Use Link for routing
                                to="/admin"
                                style={{
                                    color: '#FFFFFF',
                                    fontWeight: '500',
                                    marginRight: '15px',
                                    transition: 'color 0.3s ease',
                                    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onMouseEnter={(e) => (e.target.style.color = '#FFD700')}
                                onMouseLeave={(e) => (e.target.style.color = '#FFFFFF')}
                            >
                                <i className="fa-solid fa-lock" style={{ marginRight: '5px' }}></i>
                                Admin Dashboard
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;