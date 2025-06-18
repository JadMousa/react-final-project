import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function EditBookModal({ book, onBookUpdated }) {
  const formatDate = (input) => {
    if (!input) return '';
    const date = new Date(input);
    const iso = date.toISOString();
    return iso.slice(0, 10);
  };

  const { user } = useAuth0();
  const [show, setShow] = useState(false);
  const bookId = book.id;

  const [form, setForm] = useState({
    title: book.volumeInfo?.title || '',
    author: book.volumeInfo?.authors?.[0] || '',
    genre: book.volumeInfo?.categories?.[0] || '',
    image_url: book.volumeInfo?.imageLinks?.thumbnail || '',
    description: book.volumeInfo?.description || '',
    published: formatDate(book.volumeInfo?.publishedDate || '')
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidImageUrl = (url) => {
    if (!url.startsWith("http") && !url.startsWith("data:image/")) return false;
    const blockedPatterns = [
      "google.com/imgres",
      "google.com/url?sa=i",
      "googleusercontent.com/proxy"
    ];
    return !blockedPatterns.some(pattern => url.includes(pattern));
  };

  const handleSave = async () => {
    if (!isValidImageUrl(form.image_url)) {
      alert("❌ Please paste a direct image link. Tip: right-click the image ➝ open in new tab ➝ copy that URL. Avoid using Google image preview links.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3002/api/books/${bookId}`,
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            'user-email': user.email,
          }
        }
      );

      onBookUpdated({
        id: res.data.id,
        volumeInfo: {
          title: res.data.title,
          authors: [res.data.author],
          categories: [res.data.genre],
          publishedDate: res.data.published,
          description: res.data.description,
          imageLinks: {
            thumbnail: res.data.image_url
          }
        }
      });

      setShow(false);
      alert("✅ Book updated successfully.");
    } catch (err) {
      console.error("Error updating book:", err);
      alert("❌ Failed to update book.");
    }
  };

  return (
    <>
      <Button variant="warning" size="sm" className="mt-2" onClick={() => setShow(true)}>
        ✏️ Edit
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {["title", "author", "genre", "image_url"].map((field) => (
            <Form.Group className="mb-2" key={field}>
              <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
              <Form.Control
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
              />
            </Form.Group>
          ))}

          <Form.Group className="mb-2">
            <Form.Label>Published</Form.Label>
            <Form.Control
              type="date"
              name="published"
              value={form.published}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditBookModal;
