import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';
import './css/SubjectsPage.css';

const SubjectsPage = () => {
  const location = useLocation();
  const [subject, setSubject] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subjects = ['fiction', 'science', 'history', 'biography', 'fantasy', 'mystery'];

  useEffect(() => {
    const selectedSubject = location.state?.selectedSubject || subjects[0];
    setSubject(selectedSubject);
    fetchBooksBySubject(selectedSubject);
  }, [location.state]);

  const fetchBooksBySubject = async (subjectName) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `https://openlibrary.org/subjects/${subjectName}.json?limit=12`
      );
      setBooks(response.data.works || []);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error('Error fetching books by subject:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectClick = (subj) => {
    setSubject(subj);
    fetchBooksBySubject(subj);
  };

  return (
    <div className="container subjects-page">
      <h1>📚 Browse Books by Subject</h1>
      
      <div className="subject-tabs">
        {subjects.map((subj) => (
          <button
            key={subj}
            onClick={() => handleSubjectClick(subj)}
            className={`subject-tab ${subject === subj ? 'active' : ''}`}
          >
            {subj.charAt(0).toUpperCase() + subj.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="selected-subject">
        <h2>{subject.charAt(0).toUpperCase() + subject.slice(1)} Books</h2>
        <p>Showing {books.length} books</p>
      </div>
      
      {loading && <div className="loading">Loading books...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && books.length === 0 && (
        <div className="no-books">
          <h3>No books found in this category.</h3>
        </div>
      )}
      
      {books.length > 0 && (
        <div className="books-grid">
          {books.map((book, index) => (
            <BookCard key={`${book.key}-${index}`} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectsPage;