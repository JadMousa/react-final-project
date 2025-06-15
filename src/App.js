import './App.css';
import Books from './pages/books';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import NavigationBar from './components/navigationbar';


function App() {
    return (
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </Router>
    );
}

export default App;
