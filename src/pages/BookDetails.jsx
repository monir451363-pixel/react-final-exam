import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './css/BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://openlibrary.org/works/${id}.json`
        );
        setBook(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load book details. Please try again.');
        console.error('Error fetching book details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBack = () => {
    if (location.state?.fromSearch) {
      navigate('/books', { 
        state: { 
          searchParams: location.state.searchParams 
        } 
      });
    } else {
      navigate('/books');
    }
  };

  const getLargeCoverUrl = () => {
    if (book?.covers?.[0]) {
      return `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`;
    }
    return 'https://via.placeholder.com/300x400?text=No+Cover';
  };

  const getAuthors = () => {
    if (!book?.authors) return ['Unknown Author'];
    return book.authors.map(author => author.author?.key?.replace('/authors/', '') || 'Unknown');
  };

  if (loading) {
    return <div className="loading">Loading book details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!book) {
    return <div className="error">Book not found</div>;
  }

  return (
    <div className="container book-details">
      <button onClick={handleBack} className="btn btn-secondary back-btn">
        ← Back to Results
      </button>
      
      <div className="book-details-content">
        <div className="book-cover-large">
          <img src={getLargeCoverUrl()} alt={book.title} />
        </div>
        
        <div className="book-info-detailed">
          <h1 className="book-title-large">{book.title}</h1>
          
          <div className="info-section">
            <h3>👤 Authors</h3>
            <p>{getAuthors().join(', ')}</p>
          </div>
          
          <div className="info-grid">
            <div className="info-item">
              <h3>📅 First Published</h3>
              <p>{book.first_publish_date || book.publish_date || 'N/A'}</p>
            </div>
            
            <div className="info-item">
              <h3>📖 Number of Pages</h3>
              <p>{book.number_of_pages || book.pagination || 'N/A'}</p>
            </div>
            
            <div className="info-item">
              <h3>🏢 Publisher</h3>
              <p>{book.publishers?.join(', ') || 'N/A'}</p>
            </div>
          </div>
          
          {book.subjects && (
            <div className="info-section">
              <h3>📚 Subjects/Genres</h3>
              <div className="subjects-list">
                {book.subjects.slice(0, 10).map((subject, index) => (
                  <span key={index} className="subject-tag">
                    {typeof subject === 'string' ? subject : subject.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {book.description && (
            <div className="info-section">
              <h3>📝 Description</h3>
              <p className="book-description">
                {typeof book.description === 'string' 
                  ? book.description 
                  : book.description.value || 'No description available'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;