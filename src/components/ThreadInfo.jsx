import React from 'react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

export function ThreadInfo({
  upVotesBy, downVotesBy, comments, createdAt, ownerId,
}) {
  const { threadsUsers } = useSelector((states) => states);

  const getThreadUsersUsername = () => {
    const user = threadsUsers.find((threadUser) => threadUser.id === ownerId);
    return user ? user.name : null;
  };
  return (
    <div className="thread-info">
      <div className="likes">
        <FaRegThumbsUp />
        <p>{upVotesBy}</p>
      </div>
      <div className="dislikes">
        <FaRegThumbsDown />
        <p>{downVotesBy}</p>
      </div>
      <div className="comments">
        <FaRegCommentDots />
        <p>{comments}</p>
      </div>
      <p>{createdAt}</p>
      <p>
        Created by
        {' '}
        <strong>{getThreadUsersUsername()}</strong>
      </p>
    </div>
  );
}
