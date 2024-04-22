import React from 'react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa6';

export function ThreadInfo({
  likes, dislikes, comments, createdAt, createdBy,
}) {
  return (
    <div className="thread-info">
      <div className="likes">
        <FaRegThumbsUp />
        <p>{likes}</p>
      </div>
      <div className="dislikes">
        <FaRegThumbsDown />
        <p>{dislikes}</p>
      </div>
      <div className="comments">
        <FaRegCommentDots />
        <p>{comments}</p>
      </div>
      <p>{createdAt}</p>
      <p>{createdBy}</p>
    </div>
  );
}
