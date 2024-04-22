import React from 'react';
import { ThreadInfo } from './ThreadInfo';

export function ThreadList({ threads }) {
  return (
    <ul className="thread-list">
      {threads.length
        ? threads.map(({
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
        ))
        : ''}
    </ul>
  );
}
