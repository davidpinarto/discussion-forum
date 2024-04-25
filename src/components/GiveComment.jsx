import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';

export function GiveComment({ sendComment }) {
  const { authUser } = useSelector((states) => states);
  const [comment, onCommentChangeEventHandler] = useInput('');

  return (
    <div className="give-comment">
      <h3>Give Comment</h3>
      {authUser
        ? <textarea id="comment-input" rows="10" value={comment} onChange={onCommentChangeEventHandler} />
        : (
          <p>
            You should
            {' '}
            <Link to="/login">Login</Link>
            {' '}
            to give a comment
          </p>
        )}
      {authUser ? <button className="btn" onClick={() => sendComment(comment)}>Sent comment</button> : ''}
    </div>
  );
}
