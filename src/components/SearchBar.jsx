import React, { useState } from 'react';
import './css/SearchBar.css';

const SearchBar = ({ onSearch, onClear, subjects }) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleSearch = () => {
    onSearch({
      title: searchTitle,
      author: searchAuthor,
      subject: selectedSubject
    });
  };

  const handleClear = () => {
    setSearchTitle('');
    setSearchAuthor('');
    setSelectedSubject('');
    onClear();
  };

  return (
    <div className="search-bar">
      <div className="search-row">
        <div className="search-group">
          <label>🔍 Search by Title</label>
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Enter book title..."
          />
        </div>
        
        <div className="search-group">
          <label>✍️ Search by Author</label>
          <input
            type="text"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
            placeholder="Enter author name..."
          />
        </div>
      </div>
      
      <div className="search-row">
        <div className="search-group">
          <label>📚 Browse by Subject</label>
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div className="button-group">
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
          <button onClick={handleClear} className="btn btn-danger">
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;