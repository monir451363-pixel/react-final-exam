import React from 'react';
import { Link } from 'react-router-dom';
import './css/BookCard.css';

const BookCard = ({ book }) => {
  const getAuthors = () => {
    if (!book.author_name) return 'Unknown Author';
    return book.author_name.slice(0, 2).join(', ');
  };

  const getCoverUrl = () => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    return 'https://via.placeholder.com/150x200?text=No+Cover';
  };

  const getWorkId = () => {
    if (book.key) {
      return book.key.replace('/works/', '');
    }
    return book.id || '';
  };

  return (
    <div className="book-card">
      <div className="book-cover">
        <img src={getCoverUrl()} alt={book.title} />
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">👤 {getAuthors()}</p>
        <p className="book-year">📅 First Published: {book.first_publish_year || 'N/A'}</p>
        <Link to={`/book/${getWorkId()}`} className="btn btn-primary btn-small">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;