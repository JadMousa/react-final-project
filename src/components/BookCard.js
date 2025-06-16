// src/components/BookCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function BookCard({ book }) {
  const info = book.volumeInfo || {};
  const saleInfo = book.saleInfo || {};

  // Extract price
  let price = "Not for sale";
  if (saleInfo?.saleability === "FOR_SALE" && saleInfo.listPrice) {
    price = `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}`;
  } else if (saleInfo?.saleability === "FREE") {
    price = "Free";
  }

  // Extract category (only show first one if multiple)
  const category = info.categories ? info.categories[0] : "Uncategorized";

    // Extract published date
    const publishedDate = info.publishedDate || "Unknown";

  return (
    <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
          <Card.Text><strong>Category:</strong> {category}</Card.Text>
          <Card.Text><strong>Price:</strong> {price}</Card.Text>
          <Card.Text><strong>Published:</strong> {publishedDate}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
export default BookCard;
