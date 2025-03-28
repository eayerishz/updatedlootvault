import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductScreen() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const { data } = await axios.get(`/api/game/${id}`);

        setGame(data);
      } catch (err) {
        setError('Error fetching game details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      {game ? (
        <>
          <h1 style={{ fontSize: '2rem', color: '#333' }}>{game.name}</h1>
          <p style={{ fontSize: '1.5rem', color: '#555' }}>${game.price.toFixed(2)}</p>
          <p style={{ fontSize: '1rem', color: '#666' }}>{game.description}</p>
        </>
      ) : (
        <p>Game not found</p>
      )}
    </div>
  );
}

export default ProductScreen;
