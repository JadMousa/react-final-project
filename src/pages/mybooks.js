import React, { useEffect, useState } from 'react';
import { Container, Spinner, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import BookCard from '../components/BookCard';


function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/books");
       // 🌟 Normalize backend books to match Google API structure
       const formatted = res.data.map((book) => ({
        id: book.id, // 👈 use actual numeric DB ID
        volumeInfo: {
          title: book.title,
          authors: [book.author],
          categories: [book.genre],
          publishedDate: book.published,
          description: book.description,
          imageLinks: {
            thumbnail: book.image_url,
          }
        }
}));

      setBooks(formatted);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  fetchMyBooks();
}, []);

  if (!user) return null;

  return (
    <Container className="my-4">
      <h2>Books Added by Admin</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : books.length === 0 ? (
        <Alert variant="info">No books added yet.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {books.map((book, index) => (
            <Col key={index}>
          <BookCard
                book={book}
                onImportToGoogleList={(bookToImport) => {
                  const existing = JSON.parse(localStorage.getItem('importedIds') || '[]');
                
                  if (!existing.includes(bookToImport.id)) {
                    const updated = [...existing, bookToImport.id];
                    localStorage.setItem('importedIds', JSON.stringify(updated));
                    alert("✅ Book added to imported list.");
                    window.location.href = "/books"; // Redirect to view them
                  } else {
                    alert("⚠️ Book already imported.");
                  }
                }}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}


export default MyBooks;
