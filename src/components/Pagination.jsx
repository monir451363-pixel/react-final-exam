import React from 'react';
import './css/Pagination.css';

const Pagination = ({ pageSize, setPageSize, hasMore }) => {
  const pageSizes = [5, 10, 15, 20, 25];

  return (
    <div className="pagination">
      <div className="page-size-selector">
        <label>📖 Books per page:</label>
        <select 
          value={pageSize} 
          onChange={(e) => setPageSize(parseInt(e.target.value))}
        >
          {pageSizes.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      
      <div className="page-info">
        {hasMore && <span className="more-books">More books available...</span>}
      </div>
    </div>
  );
};

export default Pagination;