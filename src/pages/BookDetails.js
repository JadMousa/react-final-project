import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Spinner, Card, Button } from 'react-bootstrap';
import axios from 'axios';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isAdminImported, setIsAdminImported] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;

        if (/^\d+$/.test(id)) {
          // Admin-added book (from DB)
          const res = await axios.get(`${baseURL}/api/books/${id}`);
          if (!res.data || Object.keys(res.data).length === 0) {
            throw new Error("Book not found");
          }
          setBook({ volumeInfo: res.data });
          setIsAdminImported(true);
        } else {
          // Google Books API
          const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
          setBook(res.data);
          setIsAdminImported(false);
        }
      } catch (err) {
        console.error('Error fetching book:', err);
        setError(err.response?.data?.message || 'Book not found or server error');
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error || !book || !book.volumeInfo) {
    return (
      <Container className="my-4 text-center">
        <h4>❌ {error || "Book not found."}</h4>
        <Link to="/books">
          <Button variant="secondary" className="mt-3">← Back to Book List</Button>
        </Link>
      </Container>
    );
  }

  const info = book.volumeInfo;
  const image = info.imageLinks?.thumbnail || info.image_url || 'https://via.placeholder.com/150';
  const title = info.title || 'No title available';
  const author = info.authors?.join(', ') || info.author || 'Unknown Author';
  const category = info.categories?.join(', ') || info.genre || 'Uncategorized';
  const published = info.publishedDate || info.published || 'Unknown';
  const description = info.description;

  return (
    <Container className="my-4">
      <Link to="/books">
        <Button variant="secondary" className="mb-3">← Back to Books</Button>
      </Link>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
          <Card.Img
            src={image}
            alt={title}
            style={{ width: '200px', marginBottom: '1rem' }}
          />
          <Card.Text><strong>Category:</strong> {category}</Card.Text>
          <Card.Text><strong>Published:</strong> {published}</Card.Text>
          <Card.Text>
            <strong>Description:</strong><br />
            {description ? (
              <span dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
              'No description available.'
            )}
          </Card.Text>

          {isAdminImported && (
            <>
              <hr />
              <Card.Text className="mt-4">
                <strong>📌 This book was added by the admin.</strong><br />
              </Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BookDetails;
