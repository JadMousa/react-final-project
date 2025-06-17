import React from 'react';
import AddBookForm from '../forms/AddBookForm';
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Alert } from 'react-bootstrap';

function AddBookPage() {
  const { user } = useAuth0();

  if (user?.email !== "jadmousa12@gmail.com") {
    return (
      <Container className="my-5">
        <Alert variant="danger">Access denied. Only admin can add books.</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2>Add Book to the Library</h2>
      <AddBookForm />
    </Container>
  );
}

export default AddBookPage;
