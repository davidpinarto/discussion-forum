import React, { useState } from 'react';

export function MainHeader() {
  const [keyword, setKeyword] = useState('');

  return (
    <div className="main-header">
      <h2>Search Threads</h2>
      <div className="search-container">
        <input
          type="text"
          id="search-bar"
          placeholder="Search threads by title..."
          value={keyword}
          onChange={({ target }) => setKeyword(target.value)}
        />
        <button className="btn">+ Add New Thread</button>
      </div>
    </div>
  );
}
