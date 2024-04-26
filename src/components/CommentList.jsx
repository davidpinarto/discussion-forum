import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { postedAt } from '../utils';
import { asyncUpVoteDetailThreadComment, asyncDownVoteDetailThreadComment } from '../states/detailThread/action';

export function CommentList() {
  const {
    detailThread,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  const {
    id: threadId, comments,
  } = detailThread;

  return (
    <ul className="comment-list">
      {comments.length
        ? comments.map(({
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
              <button className="likes" onClick={() => dispatch(asyncUpVoteDetailThreadComment({ threadId, commentId: id }))}>
                <FaRegThumbsUp />
                {' '}
                {upVotesBy.length}
              </button>
              <button className="dislikes" onClick={() => dispatch(asyncDownVoteDetailThreadComment({ threadId, commentId: id }))}>
                <FaRegThumbsDown />
                {' '}
                {downVotesBy.length}
              </button>
              <p>{postedAt(createdAt)}</p>
            </div>
          </li>
        ))
        : <h4>There&apos;s no comment here</h4>}
    </ul>
  );
}
