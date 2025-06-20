import React, { useEffect, useState } from 'react';
import { Container, Spinner, Row, Col, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import BookCard from '../components/BookCard';
import EditBookModal from '../components/EditBookModal';

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/books`);
        const formatted = res.data.map((book) => ({
          id: book.id,
          volumeInfo: {
            title: book.title,
            authors: [book.author],
            categories: [book.genre],
            publishedDate: book.published,
            description: book.description,
            imageLinks: {
              thumbnail: book.image_url,
            },
          },
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
          {books.map((book) => (
            <Col key={book.id}>
              <div>
                <BookCard
                  book={book}
                  onImportToGoogleList={(bookToImport) => {
                    const existing = JSON.parse(localStorage.getItem('importedIds') || '[]');

                    if (!existing.includes(bookToImport.id)) {
                      const updated = [...existing, bookToImport.id];
                      localStorage.setItem('importedIds', JSON.stringify(updated));
                      alert("✅ Book added to imported list.");
                      window.location.href = "/books";
                    } else {
                      alert("⚠️ Book already imported.");
                    }
                  }}
                />
                {user.email === "jadmousa12@gmail.com" && (
                  <div className="mt-2">
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2"
                      onClick={async () => {
                        if (!window.confirm("Are you sure you want to delete this book?")) return;
                        try {
                          await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/books/${book.id}`, {
                            headers: { 'user-email': user.email }
                          });
                          setBooks(prev => prev.filter(b => b.id !== book.id));
                          alert("✅ Book deleted.");
                        } catch (err) {
                          console.error("❌ Delete failed:", err);
                          alert("Failed to delete the book.");
                        }
                      }}
                    >
                      🗑️ Delete
                    </Button>

                    <EditBookModal
                      book={book}
                      onBookUpdated={(updatedBook) => {
                        setBooks(prevBooks =>
                          prevBooks.map(b =>
                            b.id === updatedBook.id
                              ? {
                                  ...b,
                                  volumeInfo: {
                                    ...b.volumeInfo,
                                    title: updatedBook.title,
                                    authors: [updatedBook.author],
                                    categories: [updatedBook.genre],
                                    publishedDate: updatedBook.published,
                                    description: updatedBook.description,
                                    imageLinks: { thumbnail: updatedBook.image_url }
                                  }
                                }
                              : b
                          )
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default MyBooks;
