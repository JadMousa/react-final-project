import React, { useEffect, useState } from 'react';
import { Container, Spinner, Row, Col, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';

function Books() {
  const { user } = useAuth0();
  const [books, setBooks] = useState([]);
  const [importedIds, setImportedIds] = useState([]);
  const [adminBooks, setAdminBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingImports, setLoadingImports] = useState(true);

  // Load Google Books
  useEffect(() => {
    axios.get('https://www.googleapis.com/books/v1/volumes?q=api')
      .then(res => {
        setBooks(res.data.items || []);
        setLoading(false);
      }).catch(err => {
        console.error("Error fetching Google books:", err);
        setLoading(false);
      });
  }, []);

  // Load imported admin books (via localStorage + API)
  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem('importedIds') || '[]');
    setImportedIds(storedIds);

    // Fetch each book by ID from your backend
    Promise.all(storedIds.map(id =>
      axios.get(`http://localhost:3002/api/books/${id}`).then(res => ({
        id: res.data.id,
        volumeInfo: {
          title: res.data.title,
          authors: [res.data.author],
          categories: [res.data.genre],
          publishedDate: res.data.published,
          description: res.data.description,
          imageLinks: {
            thumbnail: res.data.image_url,
          }
        }
      }))
    )).then(fetchedBooks => {
      setAdminBooks(fetchedBooks);
      setLoadingImports(false);
    }).catch(err => {
      console.error("Error loading imported books:", err);
      setLoadingImports(false);
    });
  }, []);

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Books from Google Books API</h2>
        {user?.email === "jadmousa12@gmail.com" && (
          <Link to="/add-book">
            <Button variant="outline-success" size="sm">➕ Add Book</Button>
          </Link>
        )}
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 mb-5">
          {books.map(book => (
            <Col key={book.id}>
              <BookCard book={book} /> {/* No import button here */}
            </Col>
          ))}
        </Row>
      )}

      {/* Admin-imported books section */}
      {importedIds.length > 0 && (
        <>
          <h4 className="mt-5">📌 Imported from Admin</h4>
          {loadingImports ? (
            <Spinner animation="border" />
          ) : (
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {adminBooks.map(book => (
                <Col key={book.id}>
                  <BookCard book={book} /> {/* Still no import button */}
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </Container>
  );
}

export default Books;
