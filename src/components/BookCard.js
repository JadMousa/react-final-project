import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function BookCard({ book, onImportToGoogleList }) {
  const { user } = useAuth0();
  const isGoogleBook = !!book.volumeInfo;
  const info = isGoogleBook ? book.volumeInfo : book;

  const title = info.title || 'No title available';
  const author = info.authors?.[0] || info.author || 'Unknown Author';
  const category = info.categories?.[0] || info.genre || 'Uncategorized';
  const published = info.publishedDate || info.published || 'Unknown';
  
  const isValidImageUrl = (url) => {
    if (!url) return false;
    if (!url.startsWith("http") && !url.startsWith("data:image/")) return false;
    const blockedPatterns = [
      "google.com/imgres",
      "google.com/url?sa=i",
      "googleusercontent.com/proxy"
    ];
    return !blockedPatterns.some(pattern => url.includes(pattern));
  };

  const image =
    (isValidImageUrl(info.imageLinks?.thumbnail || info.image_url)
      ? (info.imageLinks?.thumbnail || info.image_url)
      : "/default-cover.png");

  const bookId = book.id;

  return (
    <Card className="h-100 shadow-sm position-relative">
      <Link to={`/books/${bookId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card.Img variant="top" src={image} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{author}</Card.Text>
          <Card.Text><strong>Category:</strong> {category}</Card.Text>
          <Card.Text><strong>Published:</strong> {published}</Card.Text>
        </Card.Body>
      </Link>

      {/* ✅ Show this button ONLY if allowed (e.g., in MyBooks) */}
      {user?.email === "jadmousa12@gmail.com" && typeof onImportToGoogleList === 'function' && (
        <div className="text-end p-2">
          <Button
            size="sm"
            variant="outline-primary"
            onClick={(e) => {
              e.preventDefault(); // Prevent link click
              onImportToGoogleList(book);
            }}
          >
            📥 Import to Google List
          </Button>
        </div>
      )}
    </Card>
  );
}

export default BookCard;
