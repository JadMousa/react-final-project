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




function App() {
  return (
    <>
    <div className="App">
          <LoginButton/>
          <LogoutButton/>
          <p>The users information is bellow</p>
          <UserProfile/>
      </div>
    <Router>
        <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetails />} />
          </Routes>
        <Footer />
    </Router>
    </>
  );
}



export default App;
