import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredThreadsActionCreator, unsetFilteredThreadsActionCreator } from '../states/filteredThreads/action';

export function CategoryList() {
  const {
    threads,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const onCategoryFilterHandler = (category) => {
    const filteredThreads = threads
      .filter((thread) => thread.category.toLowerCase() === category.toLowerCase());
    dispatch(setFilteredThreadsActionCreator(filteredThreads));
  };

  const handleClick = (category) => {
    if (selectedCategory !== category) {
      onCategoryFilterHandler(category);
      setSelectedCategory(category);
    } else {
      dispatch(unsetFilteredThreadsActionCreator());
      setSelectedCategory(null);
    }
  };

  return (
    <ul className="category-list">
      {threads.length
        ? threads.map(({ id, category }) => (
          <li key={id}>
            <button
              className={`category-item ${selectedCategory === category ? 'selected' : ''}`}
              onClick={() => handleClick(category)}
            >
              {category}
            </button>
          </li>
        ))
        : ''}
    </ul>
  );
}
