// src/pages/Home.js
import React from 'react';
import { Container } from 'react-bootstrap';

function Home() {
    return (
        <Container className="text-center mt-5">
          <h1>📚 Welcome to the Library App</h1>
          <p className="lead">Click on <strong>Books</strong> in the navbar to browse our collection.</p>
        </Container>
      );
    }

export default Home;


