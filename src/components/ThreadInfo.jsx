import React from 'react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { postedAt } from '../utils';

export function ThreadInfo({
  upVotesBy, downVotesBy, totalComments, createdAt, ownerId,
}) {
  const { users } = useSelector((states) => states);

  const getUsersUsername = () => {
    const user = users.find((userr) => userr.id === ownerId);
    return user ? user.name : null;
  };
  const getUsersAvatar = () => {
    const user = users.find((userr) => userr.id === ownerId);
    return user ? user.avatar : null;
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
        <p>{totalComments}</p>
      </div>
      <p>{postedAt(createdAt)}</p>
      <div className="users-threads-info">
        <img src={getUsersAvatar()} alt="avatar" />
        <p>
          Created by
          {' '}
          <strong>{getUsersUsername()}</strong>
        </p>
      </div>
    </div>
  );
}
