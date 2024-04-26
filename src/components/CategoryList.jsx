import React from 'react';
import { useSelector } from 'react-redux';

export function CategoryList({ selectedCategory, onThreadFilter }) {
  const {
    threads,
  } = useSelector((states) => states);

  const uniqueCategories = [...new Set(threads.map((thread) => thread.category))];

  return (
    <ul className="category-list">
      {uniqueCategories.length
        ? uniqueCategories.map((category) => (
          <li key={category}>
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
