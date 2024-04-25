import React from 'react';
import { useSelector } from 'react-redux';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { postedAt } from '../utils';

export function CommentList() {
  const {
    detailThread,
  } = useSelector((states) => states);
  const {
    comments,
  } = detailThread;

  return (
    <ul className="comment-list">
      {comments.map(({
        id, content, createdAt, owner: { name, avatar }, upVotesBy, downVotesBy,
      }) => (
        <li key={id}>
          <div className="comment-profile-info">
            <img src={avatar} alt="avatar" />
            <h4>{name}</h4>
          </div>
          <p className="comment-content">
            {content}
          </p>
          <div className="comment-info">
            <div className="likes">
              <FaRegThumbsUp />
              <p>{upVotesBy.length}</p>
            </div>
            <div className="dislikes">
              <FaRegThumbsDown />
              <p>{downVotesBy.length}</p>
            </div>
            <p>{postedAt(createdAt)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
