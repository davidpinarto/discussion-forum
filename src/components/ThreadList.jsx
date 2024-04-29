import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThreadInfo } from './ThreadInfo';

export function ThreadList({ filteredThreads }) {
  const threads = useSelector((states) => states.threads);

  if (filteredThreads) {
    return (
      <ul className="thread-list">
        {filteredThreads.map(({
          id, title, body, upVotesBy, downVotesBy, totalComments, createdAt, ownerId,
        }) => (
          <li key={id}>
            <h2><Link to={`/threads/${id}`}>{title}</Link></h2>
            <div className="thread-body">
              {body.length > 200
                ? `${body.substring(0, 200)}...`
                : body}
            </div>
            <ThreadInfo
              threadId={id}
              upVotesBy={upVotesBy.length}
              downVotesBy={downVotesBy.length}
              totalComments={totalComments}
              createdAt={createdAt}
              ownerId={ownerId}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="thread-list">
      {threads.map(({
        id, title, body, upVotesBy, downVotesBy, totalComments, createdAt, ownerId,
      }) => (
        <li key={id}>
          <h2><Link to={`/threads/${id}`}>{title}</Link></h2>
          <div className="thread-body">
            {body.length > 200
              ? `${body.substring(0, 200)}...`
              : body}
          </div>
          <ThreadInfo
            threadId={id}
            upVotesBy={upVotesBy.length}
            downVotesBy={downVotesBy.length}
            totalComments={totalComments}
            createdAt={createdAt}
            ownerId={ownerId}
          />
        </li>
      ))}
    </ul>
  );
}
