import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const response = await axios.get(`http://localhost:8000/api/games/search?name=${searchQuery}`);
        setSearchResults(response.data); // Assuming the API returns search results
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]); // Clear results if the search bar is empty
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);

    // Trigger the search as user types
    if (event.target.value.trim() !== '') {
      handleSearch();
    } else {
      setSearchResults([]); // Clear results if the search bar is empty
    }
  };

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
          <img src="/LOGO.png" alt="LootVault Logo" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
          LootVault
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Search Bar */}
          <Form className="mx-auto d-flex" style={{ width: '50%' }} onSubmit={(e) => e.preventDefault()}>
            <FormControl
              type="search"
              placeholder="Search for games..."
              className="me-2"
              aria-label="Search"
              style={{
                borderRadius: '30px',
                border: '2px solid #6C63FF',
                padding: '0.5rem 1rem',
                backgroundColor: '#282c34',
                color: '#FFFFFF',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.6)',
                zIndex: 2,
                transition: 'all 0.3s ease',
              }}
              value={searchQuery}
              onChange={handleChange}
              onFocus={(e) => e.target.style.backgroundColor = '#444444'}
              onBlur={(e) => e.target.style.backgroundColor = '#282c34'}
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
              onClick={handleSearch}
            >
              Search
            </Button>
          </Form>

          {/* Search Results Dropdown */}
          {searchQuery && (
            <div
              style={{
                position: 'absolute',
                top: '100%', // Position it right below the search bar
                left: '50%', // Align it with the center of the search bar
                transform: 'translateX(-50%)', // Center the dropdown
                backgroundColor: '#fff',
                width: '50%', // Width matches search bar
                maxHeight: '300px',
                overflowY: 'scroll',
                borderRadius: '8px',
                marginTop: '10px', // Small space between the search bar and the dropdown
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                zIndex: 10, // Ensure the dropdown appears above other content
                color: '#000',
              }}
            >
              {searchResults.length > 0 ? (
                <ListGroup>
                  {searchResults.map((game) => (
                    <ListGroup.Item
                      key={game._id}
                      style={{
                        cursor: 'pointer',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '1px solid #ddd',
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)')} // Slight darken effect
                      onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')} // Default background
                    >
                      {/* Game Image */}
                      <img
                        src={`http://localhost:3000${game.image_url}`} // Ensure the path is correct
                        alt={game.name}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '5px',
                          marginRight: '15px',
                        }}
                      />
                      {/* Game Name */}
                      <div>
                        <strong style={{ color: 'black' }}>{game.name}</strong> {/* Display game name with black color */}
                        <p style={{ fontSize: '12px', color: '#555' }}>{game.category}</p> {/* Optional category */}
                      </div>

                      {/* Link to OrderScreen (without appending the game ID) */}
                      <Link to="/order-screen" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1 }} />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div
                  style={{
                    padding: '10px',
                    textAlign: 'center',
                    color: '#777',
                    fontSize: '14px',
                  }}
                >
                  No results found
                </div>
              )}
            </div>
          )}

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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
