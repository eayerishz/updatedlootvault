import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function OrderScreen() {
  const location = useLocation();
  const selectedGame = location.state?.selectedGame;

  const [games, setGames] = useState(selectedGame ? [selectedGame] : []);
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!selectedGame) {
      const fetchGames = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/games/');
          setGames(response.data);
        } catch (error) {
          console.error('Error fetching games:', error);
        }
      };
      fetchGames();
    }
  }, [selectedGame]);

  const handleQuantityChange = (gameId, quantity) => {
    setOrderItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === gameId);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === gameId ? { ...item, quantity: parseInt(quantity) } : item
        );
      } else {
        return [...prevItems, { id: gameId, quantity: parseInt(quantity) }];
      }
    });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    orderItems.forEach(item => {
      const game = games.find(game => game._id === item.id);
      if (game && item.quantity > 0) {
        total += game.price * item.quantity;
      }
    });
    setTotalPrice(total);
  };

  const handleCreateOrder = async () => {
    try {
      const placeholderUserId = 1;

      const response = await axios.post('http://localhost:8000/api/create-order/', {
        total_price: totalPrice,
        order_items: orderItems,
        user: placeholderUserId,
      });

      setMessage(`Order created successfully! Order ID: ${response.data.order_id}`);
      console.log('Order created:', response.data);
      setOrderItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('Error creating order:', error);
      setMessage('Error creating order. Please try again.');
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [orderItems]);

  return (
    <div>
      <h1>Create Order</h1>
      <h2>Select Games</h2>
      {games.map(game => (
        <div key={game._id}>
          <h3>{game.name} - ${game.price}</h3>
          <input
            type="number"
            min="0"
            placeholder="Quantity"
            onChange={(e) => handleQuantityChange(game._id, e.target.value)}
          />
        </div>
      ))}
      <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      <button onClick={handleCreateOrder}>Create Order</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default OrderScreen;