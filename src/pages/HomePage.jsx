import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryList } from '../components/CategoryList';
import { ThreadList } from '../components/ThreadList';
import { setThreadsActionCreator } from '../states/threads/action';

export function HomePage() {
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  const fakeThreads = [
    {
      id: 1,
      title: 'Judul pertama',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime saepe cumque minima ab pariatur iusto ex cum voluptates quisquam, sed molestiae, dignissimos debitis maiores ipsum libero veniam hic perferendis quas non quia odit aperiam dolore inventore? Recusandae velit, obcaecati, eum est quas tenetur unde quo deleniti dolor, nobis sapiente voluptates?',
      likes: 1,
      dislikes: 1,
      comments: 1,
      createdAt: '1 hour ago',
      createdBy: 'David Pinarto',
      category: 'pertama',
    },
    {
      id: 2,
      title: 'Judul kedua',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime saepe cumque minima ab pariatur iusto ex cum voluptates quisquam, sed molestiae, dignissimos debitis maiores ipsum libero veniam hic perferendis quas non quia odit aperiam dolore inventore? Recusandae velit, obcaecati, eum est quas tenetur unde quo deleniti dolor, nobis sapiente voluptates?',
      likes: 1,
      dislikes: 1,
      comments: 1,
      createdAt: '1 hour ago',
      createdBy: 'David Pinarto',
      category: 'kedua',
    },
    {
      id: 3,
      title: 'Judul ketiga',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime saepe cumque minima ab pariatur iusto ex cum voluptates quisquam, sed molestiae, dignissimos debitis maiores ipsum libero veniam hic perferendis quas non quia odit aperiam dolore inventore? Recusandae velit, obcaecati, eum est quas tenetur unde quo deleniti dolor, nobis sapiente voluptates?',
      likes: 1,
      dislikes: 1,
      comments: 1,
      createdAt: '1 hour ago',
      createdBy: 'David Pinarto',
      category: 'ketiga',
    },
  ];

  React.useEffect(() => {
    dispatch(setThreadsActionCreator(fakeThreads));
  }, []);

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
