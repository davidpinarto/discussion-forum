import React from 'react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { postedAt } from '../utils';
import { asyncDownVoteThread, asyncUpVoteThread } from '../states/threads/action';

export function ThreadInfo({
  upVotesBy, downVotesBy, totalComments, createdAt, ownerId, threadId,
}) {
  const { users } = useSelector((states) => states);

  const dispatch = useDispatch();

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
      <button className="likes" onClick={() => dispatch(asyncUpVoteThread(threadId))}>
        <FaRegThumbsUp />
        {' '}
        {upVotesBy}
      </button>
      <button className="dislikes" onClick={() => dispatch(asyncDownVoteThread(threadId))}>
        <FaRegThumbsDown />
        {' '}
        {downVotesBy}
      </button>
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
