import React from 'react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { postedAt } from '../utils';
import { asyncUpVoteThread, asyncDownVoteThread } from '../states/threads/action';

export function DetailThread({
  threadId,
  title,
  body,
  upVotesBy,
  downVotesBy,
  createdAt,
  ownerName,
  avatar,
}) {
  const dispatch = useDispatch();

  return (
    <div className="detail-thread">
      <h2>{title}</h2>
      <div className="thread-body">
        {body}
      </div>
      <div className="thread-info">
        <button className="likes" onClick={() => dispatch(asyncUpVoteThread(threadId))}>
          <FaRegThumbsUp />
          {' '}
          {upVotesBy.length}
        </button>
        <button className="dislikes" onClick={() => dispatch(asyncDownVoteThread(threadId))}>
          <FaRegThumbsDown />
          {' '}
          {downVotesBy.length}
        </button>
        <p>{postedAt(createdAt)}</p>
        <div className="users-threads-info">
          <img src={avatar} alt="avatar" />
          <p>
            Created by
            {' '}
            <strong>{ownerName}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
