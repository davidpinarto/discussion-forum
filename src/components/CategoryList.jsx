import React from 'react';

export function CategoryList({ threads }) {
  return (
    <ul className="category-list">
      {threads.length
        ? threads.map(({
          id, category,
        }) => (
          <li key={id}>
            <button className="category-item">{category}</button>
          </li>
        ))
        : ''}
    </ul>
  );
}
