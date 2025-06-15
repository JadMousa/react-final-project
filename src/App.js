import './App.css';
import Books from './pages/books';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavigationBar from './components/navigationbar';


function App() {
    return (
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    );
}

export default App;
