import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button, Alert } from 'react-bootstrap';


function AddBookForm({ onBookAdded = () => {} }) {
  const { user } = useAuth0();
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    image_url: '',
    description: '',
    published: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


    const isValidImageUrl = (url) => {
      if (!url.startsWith("http") && !url.startsWith("data:image/")) return false;
    
      const blockedPatterns = [
        "google.com/imgres",
        "google.com/url?sa=i",
        "googleusercontent.com/proxy" // optional: blocks Google's CDN redirects
      ];
    
      for (let pattern of blockedPatterns) {
        if (url.includes(pattern)) return false;
      }
    
      return true;
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

      // ✅ Validate image URL format
      if (!isValidImageUrl(form.image_url)) {
        setError("❌ Please paste a direct image link. Tip: right-click the image ➝ open in new tab ➝ copy that URL. Avoid using Google image preview links.");
        return;
      }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-email': user?.email
        },
        body: JSON.stringify(form)
      });

      if (res.status === 201) {
        setSuccess(true);
        setForm({ title: '', author: '', genre: '', image_url: '', description: '', published: '' });
        onBookAdded(); // optional: reload books
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to add book');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <h4>Add a New Book</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Book added!</Alert>}
      {["title", "author", "genre", "image_url"].map(field => (
        <Form.Group className="mb-2" key={field}>
          <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
          <Form.Control
            type={field === "image_url" ? "url" : "text"}
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
          type="date" // ✅ Safe for PostgreSQL DATE format
          name="published"
          value={form.published}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
      </Form.Group>
      <Button type="submit" variant="primary">Add Book</Button>
    </Form>
  );
}

export default AddBookForm;
