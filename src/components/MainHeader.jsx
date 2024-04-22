import React, { useState } from 'react';

export function MainHeader() {
  const [keyword, setKeyword] = useState('');

  return (
    <>
      <div className="search-container">
        <h2>Search Threads</h2>
        <input
          type="text"
          id="search-bar"
          placeholder="Search threads by title..."
          value={keyword}
          onChange={({ target }) => setKeyword(target.value)}
        />
      </div>
      <button className="btn">+ Add New Thread</button>
    </>
  );
}
