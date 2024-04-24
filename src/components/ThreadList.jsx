import React from 'react';
import { useSelector } from 'react-redux';
import { ThreadInfo } from './ThreadInfo';

export function ThreadList() {
  const {
    threads,
    filteredThreads,
  } = useSelector((states) => states);

  const checkRenderThreadsCondition = () => {
    if (filteredThreads) {
      return filteredThreads.map(({
        id, title, body, likes, dislikes, comments, createdAt, createdBy,
      }) => (
        <li key={id}>
          <h2>{title}</h2>
          <div className="thread-body">
            {body}
          </div>
          <ThreadInfo
            likes={likes}
            dislikes={dislikes}
            comments={comments}
            createdAt={createdAt}
            createdBy={createdBy}
          />
        </li>
      ));
    }

    return threads.map(({
      id, title, body, likes, dislikes, comments, createdAt, createdBy,
    }) => (
      <li key={id}>
        <h2>{title}</h2>
        <div className="thread-body">
          {body}
        </div>
        <ThreadInfo
          likes={likes}
          dislikes={dislikes}
          comments={comments}
          createdAt={createdAt}
          createdBy={createdBy}
        />
      </li>
    ));
  };

  return (
    <ul className="thread-list">
      {checkRenderThreadsCondition()}
    </ul>
  );
}
