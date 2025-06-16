import './App.css';
import Books from './pages/books';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import NavigationBar from './components/navigationbar';
import Footer from './components/footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from './components/loginbutton';
import LogoutButton from './components/logoutbutton';
import UserProfile from './components/userprofile.js';
import Account from './pages/account';




function App() {
  return (

    <Router>
        <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        <Footer />
    </Router>
  );
}



export default App;
