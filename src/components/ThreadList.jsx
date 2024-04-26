import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThreadInfo } from './ThreadInfo';

export function ThreadList() {
  const {
    threads,
    filteredThreads,
  } = useSelector((states) => states);

  const checkRenderThreadsCondition = () => {
    if (filteredThreads) {
      return filteredThreads.map(({
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
      ));
    }

    return threads.map(({
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
    ));
  };

  return (
    <ul className="thread-list">
      {checkRenderThreadsCondition()}
    </ul>
  );
}
