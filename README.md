# 📚 Library Web App – Frontend

This is the frontend of the **Library Management Web App**, built with [React.js](https://reactjs.org/). It interfaces with a custom backend (Node.js + PostgreSQL) and integrates the **Google Books API** to fetch external book data. Authenticated users can browse books, while administrators can manage the library content.

---

## ✨ Features

- 🔍 **Browse Books** via Google Books API  
- 👤 **User Authentication** with Auth0  
- 📄 **Detailed Book View** on individual pages  
- 🛠️ **Admin Panel** to:
  - Add new books
  - Edit or delete existing entries  
- 📁 **User Book Collection** in "My Books" page  

---

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router, Auth0  
- **Backend:** Node.js, Express.js, PostgreSQL (REST API)  
- **APIs:** Google Books API  

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/library-frontend.git
   cd library-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
src/
├── components/         # UI components (Navbar, BookCard, etc.)
├── forms/              # Reusable form components (e.g., AddBookForm)
├── pages/              # Application views (Home, Books, MyBooks, etc.)
├── services/           # API calls and utilities
├── App.js              # Main application routes
├── index.js            # Entry point
```

---

## 🧠 Notes

- Admin access is based on the authenticated email (hardcoded for demo).
- The app fetches book metadata from Google Books but stores admin-added books in a custom database.
- Book cover images can be base64 or external URLs.

---

## 📎 License

This project is for educational purposes only.
