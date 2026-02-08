import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import SubjectList from '../components/SubjectList';
import './css/BooksPage.css';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    title: '',
    author: '',
    subject: ''
  });
  const [pageSize, setPageSize] = useState(10);
  const [hasMore, setHasMore] = useState(false);

  const subjects = ['fiction', 'science', 'history', 'biography', 'fantasy', 'mystery'];

  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    
    try {
      let url = '';
      
      if (searchParams.subject) {
        url = `https://openlibrary.org/subjects/${searchParams.subject}.json?limit=${pageSize}`;
      } else if (searchParams.title) {
        url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchParams.title)}&limit=${pageSize}`;
      } else if (searchParams.author) {
        url = `https://openlibrary.org/search.json?author=${encodeURIComponent(searchParams.author)}&limit=${pageSize}`;
      } else {
        // Default: show popular books
        url = `https://openlibrary.org/search.json?q=popular&limit=${pageSize}`;
      }
      
      const response = await axios.get(url);
      
      if (searchParams.subject) {
        setBooks(response.data.works || []);
        setHasMore((response.data.works?.length || 0) >= pageSize);
      } else {
        setBooks(response.data.docs || []);
        setHasMore((response.data.numFound || 0) > pageSize);
      }
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleClear = () => {
    setSearchParams({ title: '', author: '', subject: '' });
    setPageSize(10);
  };

  useEffect(() => {
    fetchBooks();
  }, [searchParams, pageSize]);

  return (
    <div className="container">
      <SubjectList subjects={subjects} />
      
      <SearchBar 
        onSearch={handleSearch}
        onClear={handleClear}
        subjects={subjects}
      />
      
      {loading && <div className="loading">Loading books...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && books.length === 0 && (
        <div className="no-books">
          <h3>No books found. Try a different search!</h3>
        </div>
      )}
      
      {books.length > 0 && (
        <>
          <div className="books-grid">
            {books.map((book, index) => (
              <BookCard key={`${book.key}-${index}`} book={book} />
            ))}
          </div>
          
          <Pagination 
            pageSize={pageSize}
            setPageSize={setPageSize}
            hasMore={hasMore}
          />
        </>
      )}
    </div>
  );
};

export default BooksPage;