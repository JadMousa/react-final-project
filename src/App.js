import './App.css';
import Books from './pages/books';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Routes>
         
         <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
