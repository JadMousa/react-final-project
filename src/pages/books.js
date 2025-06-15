import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { Link } from 'react-router-dom';


function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        'https://www.googleapis.com/books/v1/volumes?q=api'
      );
      setBooks(res.data.items || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching books:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="mb-4">Books from Google Books API</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
     {books.map((book) => (
         <Col key={book.id}>

             <BookCard book={book} />

        </Col>

     ))}
</Row>
      )}
</Container>
  );
}  
export default Books;
