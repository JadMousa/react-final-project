import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Spinner, Card, Button } from 'react-bootstrap';
import axios from 'axios';

function BookDetails() {
  const { id } = useParams(); // book ID from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBookDetails = async () => {
    try {
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
      setBook(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching book details:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  if (loading) return <Spinner animation="border" className="m-4" />;

  if (!book) return <p>Book not found.</p>;

  const info = book.volumeInfo;

  return (
    <Container className="my-4">
      <Link to="/books">
        <Button variant="secondary" className="mb-3">← Back to Books</Button>
      </Link>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>{info.title || 'No Title'}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{info.authors?.join(', ') || 'Unknown Author'}</Card.Subtitle>
          <Card.Img
            src={info.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
            alt={info.title}
            style={{ width: '200px', marginBottom: '1rem' }}
          />
          <Card.Text>
            <strong>Description:</strong><br />{/* Render HTML content properly instead of showing raw HTML tags */}
            {info.description ? (
              <div dangerouslySetInnerHTML={{ __html: info.description }} />  
            ) : (
              'No description available.'
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BookDetails;
