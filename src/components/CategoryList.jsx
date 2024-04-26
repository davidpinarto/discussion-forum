import React from 'react';
import { useSelector } from 'react-redux';

export function CategoryList({ selectedCategory, onThreadFilter }) {
  const {
    threads,
  } = useSelector((states) => states);

  return (
    <ul className="category-list">
      {threads.length
        ? threads.map(({ id, category }) => (
          <li key={id}>
            <button
              className={`category-item ${selectedCategory === category ? 'selected' : ''}`}
              onClick={() => onThreadFilter(category)}
            >
              {category}
            </button>
          </li>
        ))
        : ''}
    </ul>
  );
}
