// src/components/BookCard.js
import React from 'react';
import { Card } from 'react-bootstrap';

function BookCard({ book }) {
  const info = book.volumeInfo || {};

  return (
    <Card className="h-100 shadow-sm">
      {info.imageLinks?.thumbnail ? (
        <Card.Img
          variant="top"
          src={info.imageLinks.thumbnail}
          alt={info.title || 'No title'}
        />
      ) : (
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/150"
          alt="No cover available"
        />
      )}
      <Card.Body>
        <Card.Title>{info.title || 'No title available'}</Card.Title>
        <Card.Text>{info.authors?.join(', ') || 'Unknown Author'}</Card.Text>
      </Card.Body>
    </Card>
  );
}


export default BookCard;
