import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form, Alert } from 'react-bootstrap';

function OrderScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedGame = location.state?.selectedGame;

  const [games, setGames] = useState(selectedGame ? [selectedGame] : []);
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');

  // Fetch games only if no game is selected
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

  // Handle quantity changes
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

  // Calculate total price based on selected quantities
  const calculateTotalPrice = () => {
    let total = 0;
    orderItems.forEach(item => {
      const game = games.find(game => game._id === item.id);
      if (game && item.quantity > 0) {
        total += (typeof game.price === 'number' ? game.price : 0) * item.quantity; // Ensure price is a number
      }
    });
    setTotalPrice(total);
  };

  // Create order request (Purchase)
  const handlePurchase = async () => {
    try {
      const placeholderUserId = 1; // Replace with actual user id logic

      const response = await axios.post('http://localhost:8000/api/create-order/', {
        total_price: totalPrice,
        order_items: orderItems,
        user: placeholderUserId,
      });

      setMessage(`Order created successfully! Order ID: ${response.data.order_id}`);
      setOrderItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('Error creating order:', error);
      setMessage('Error creating order. Please try again.');
    }
  };

  // Recalculate total price when orderItems change
  useEffect(() => {
    calculateTotalPrice();
  }, [orderItems]);

  // Navigate to home when Cancel button is clicked
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Order Details</h1> {/* Title Changed to "Order Details" */}

      {/* Game Selection */}
      <Row>
        {games.map(game => (
          <Col key={game._id} md={4} sm={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={game.image} alt={game.name} />
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                  Price: $
                  {typeof game.price === 'number' 
                    ? game.price.toFixed(2) 
                    : 'N/A'} {/* Fallback if price is not a number */}
                </Card.Text>

                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="Enter quantity"
                    onChange={(e) => handleQuantityChange(game._id, e.target.value)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Total Price and Purchase/Cancel Buttons */}
      <Row className="mt-4">
        <Col md={6}>
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        </Col>
        <Col md={6} className="text-right">
          <Button
            variant="primary"
            size="lg"
            onClick={handlePurchase}
            disabled={orderItems.length === 0 || totalPrice === 0}
            className="mr-2"
          >
            Purchase
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Col>
      </Row>

      {/* Success/Error Message */}
      {message && (
        <Row className="mt-3">
          <Col>
            <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>
              {message}
            </Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default OrderScreen;
