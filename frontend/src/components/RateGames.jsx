import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';

function RateGames() {
  const [games, setGames] = useState([]); // State to hold the list of games
  const [selectedGame, setSelectedGame] = useState(null); // State to hold the selected game
  const [rating, setRating] = useState(0); // State to hold the user's rating
  const [message, setMessage] = useState(''); // State to hold success/error messages

  // Fetch games from the backend
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/games/');
        setGames(response.data); // Set the fetched games into state
      } catch (error) {
        console.error('Error fetching games:', error);
        setMessage('Failed to fetch games. Please try again later.');
      }
    };
    fetchGames();
  }, []);

  const handleSubmitRating = async () => {
    if (!selectedGame || !rating) {
      setMessage('Please select a game and provide a rating.');
      return;
    }

    try {
      console.log("Submitting rating with payload:", { game_id: selectedGame, rating }); // Log the payload
      const response = await axios.post(
        'http://localhost:8000/api/submit-rating/',
        { game_id: selectedGame, rating },
        { 
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      console.log("Rating submission response:", response.data); // Log the response
      setMessage('Rating submitted successfully!');
    } catch (error) {
      console.error("Error submitting rating:", error.response ? error.response.data : error.message); // Log the error
      setMessage('Error submitting rating. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Rate Games</h1>
      <h2>Select a Game</h2>
      <select 
        onChange={(e) => setSelectedGame(e.target.value)} 
        style={{ padding: '10px', fontSize: '16px', width: '100%', maxWidth: '400px' }}
      >
        <option value="">Select a game</option>
        {games.map((game) => (
          <option key={game._id} value={game._id}>
            {game.name}
          </option>
        ))}
      </select>

      <h2>Rate the Game</h2>
      <ReactStars
        count={5}
        value={rating}
        onChange={(newRating) => setRating(newRating)}
        size={24}
        activeColor="#ffd700"
      />

      <button 
        onClick={handleSubmitRating} 
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Submit Rating
      </button>
      {message && <p style={{ marginTop: '20px', color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}

export default RateGames;