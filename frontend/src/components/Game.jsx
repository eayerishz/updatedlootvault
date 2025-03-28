import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Game({ game }) {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/game/${game.name}`}>
        <Card.Img src={game.image} />
      </a>
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <Card.Text>${game.price.toFixed(2)}</Card.Text>
        <Button variant='primary'>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}


export default Game;
