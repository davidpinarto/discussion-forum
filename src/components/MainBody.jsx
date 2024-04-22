import React from 'react';
import { ThreadList } from './ThreadList';

export function MainBody() {
  const fakeThreads = [
    {
      id: 1,
      title: 'Title',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime saepe cumque minima ab pariatur iusto ex cum voluptates quisquam, sed molestiae, dignissimos debitis maiores ipsum libero veniam hic perferendis quas non quia odit aperiam dolore inventore? Recusandae velit, obcaecati, eum est quas tenetur unde quo deleniti dolor, nobis sapiente voluptates?',
      likes: 1,
      dislikes: 1,
      comments: 1,
      createdAt: '1 hour ago',
      createdBy: 'David Pinarto',
    },
    {
      id: 2,
      title: 'Title',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime saepe cumque minima ab pariatur iusto ex cum voluptates quisquam, sed molestiae, dignissimos debitis maiores ipsum libero veniam hic perferendis quas non quia odit aperiam dolore inventore? Recusandae velit, obcaecati, eum est quas tenetur unde quo deleniti dolor, nobis sapiente voluptates?',
      likes: 1,
      dislikes: 1,
      comments: 1,
      createdAt: '1 hour ago',
      createdBy: 'David Pinarto',
    },
    {
      id: 3,
      title: 'Title',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime saepe cumque minima ab pariatur iusto ex cum voluptates quisquam, sed molestiae, dignissimos debitis maiores ipsum libero veniam hic perferendis quas non quia odit aperiam dolore inventore? Recusandae velit, obcaecati, eum est quas tenetur unde quo deleniti dolor, nobis sapiente voluptates?',
      likes: 1,
      dislikes: 1,
      comments: 1,
      createdAt: '1 hour ago',
      createdBy: 'David Pinarto',
    },
  ];
  return (
    <div className="main-body">
      <h1>Discussion Threads</h1>
      <ThreadList threads={fakeThreads} />
    </div>
  );
}
