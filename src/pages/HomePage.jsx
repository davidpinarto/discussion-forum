import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CategoryList } from '../components/CategoryList';
import { ThreadList } from '../components/ThreadList';
import { asyncGetAllThreads } from '../states/threads/action';
import { asyncGetAllUsers } from '../states/users/action';

export function HomePage() {
  const authUser = useSelector((states) => states.authUser);
  const threads = useSelector((states) => states.threads);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncGetAllThreads());
    dispatch(asyncGetAllUsers());
  }, [dispatch]);

  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const onCategoryFilterHandler = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  if (selectedCategory) {
    const filteredThreads = threads
      .filter((thread) => thread.category.toLowerCase() === selectedCategory.toLowerCase());
    return (
      <div className="home-page">
        <h1>Discussion Threads</h1>
        <div className="main-body">
          <aside>
            {authUser ? (
              <button id="add-thread" className="btn">
                <Link to="/add-thread">+ Add New Thread</Link>
              </button>
            ) : ''}
            <CategoryList
              selectedCategory={selectedCategory}
              onThreadFilter={onCategoryFilterHandler}
            />
          </aside>
          <ThreadList filteredThreads={filteredThreads} />
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <h1>Discussion Threads</h1>
      <div className="main-body">
        <aside>
          {authUser ? (
            <button id="add-thread" className="btn">
              <Link to="/add-thread">+ Add New Thread</Link>
            </button>
          ) : ''}
          <CategoryList
            selectedCategory={selectedCategory}
            onThreadFilter={onCategoryFilterHandler}
          />
        </aside>
        <ThreadList />
      </div>
    </div>
  );
}
