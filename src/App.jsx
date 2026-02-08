import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import BooksPage from './pages/BooksPage';
import BookDetails from './pages/BookDetails';
import SubjectsPage from './pages/SubjectsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>📚 Book Library Manager</h1>
        </header>
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/subjects" element={<SubjectsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;