import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomeScreen() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(true);  // Added state for popup

  useEffect(() => {
    async function fetchGames() {
      console.log('Fetching games from API...');
      try {
        const { data } = await axios.get('http://localhost:8000/api/games/');
        console.log('Games fetched successfully:', data);
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
        setError('Please try again later.');
      }
    }
    fetchGames();
  }, []);

  console.log('Games state:', games);
  console.log('Error state:', error);

  return (
    <div
      style={{
        background: 'linear-gradient(45deg, rgba(255, 0, 255, 0.6), rgba(0, 0, 255, 0.6))',
        padding: '20px 0',
        backgroundSize: '300% 300%',
        animation: 'bgAnimation 5s ease infinite',
        minHeight: '100vh',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* First Purchase Promo Popup */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(135deg, #444, #8000c0)',
            color: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.4)',
            zIndex: 1000,
            textAlign: 'center',
            width: '400px',
          }}
        >
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '10px' }}>
            🔥First Purchase Promo🔥
          </h2>
          <p style={{ fontSize: '18px', fontWeight: '500' }}>
            Enjoy <strong>exclusive discounts</strong> on your first purchase! Don't miss out!
          </p>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '15px',
              background: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            ✖
          </button>
        </div>
      )}

      <Container>
        <div
          style={{
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '20px 0',
            borderRadius: '15px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
            marginBottom: '40px',
          }}
        >
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: '4rem',
              textShadow: '0 0 10px rgba(255, 0, 255, 0.9), 0 0 20px rgba(0, 0, 255, 0.9)',
              fontFamily: 'Orbitron, sans-serif',
            }}
          >
            Popular Games
          </h1>
        </div>

        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

        <Row>
          {games.map(game => (
            <Col key={game._id} sm={12} md={6} lg={4} xl={3} style={{ paddingBottom: '20px' }}>
              <div
                style={{
                  backgroundColor: '#222',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  padding: '10px',
                }}
              >
                <Link to="/order-screen" state={{ selectedGame: game }}>
                  <img
                    src={`http://localhost:3000/${game.image_url}`}
                    alt={game.name}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Link>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: '#fff',
                    padding: '10px',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    fontFamily: 'Orbitron, sans-serif',
                    textShadow: '0 0 5px rgba(0, 0, 0, 0.7)',
                  }}
                >
                  {game.name}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default HomeScreen;
