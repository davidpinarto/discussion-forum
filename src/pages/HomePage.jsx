import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryList } from '../components/CategoryList';
import { ThreadList } from '../components/ThreadList';
import { asyncGetAllThreads } from '../states/threads/action';

export function HomePage() {
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncGetAllThreads());
  }, [dispatch]);

  return (
    <div className="home-page">
      <h1>Discussion Threads</h1>
      <div className="main-body">
        <aside>
          {authUser ? <button id="add-thread" className="btn">+ Add New Thread</button> : ''}
          <CategoryList />
        </aside>
        <ThreadList />
      </div>
    </div>
  );
}
