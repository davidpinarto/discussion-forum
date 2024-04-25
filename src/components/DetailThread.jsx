import React from 'react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { postedAt } from '../utils';

export function DetailThread({
  title,
  body,
  upVotesBy,
  downVotesBy,
  createdAt,
  ownerName,
}) {
  return (
    <div className="detail-thread">
      <h2>{title}</h2>
      <div className="thread-body">
        {body}
      </div>
      <div className="thread-info">
        <div className="likes">
          <FaRegThumbsUp />
          <p>{upVotesBy.length}</p>
        </div>
        <div className="dislikes">
          <FaRegThumbsDown />
          <p>{downVotesBy.length}</p>
        </div>
        <p>{postedAt(createdAt)}</p>

        <p>
          Created by
          {' '}
          <strong>{ownerName}</strong>
        </p>
      </div>
    </div>
  );
}
