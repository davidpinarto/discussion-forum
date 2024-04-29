import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';

export function GiveComment({ sendComment }) {
  const authUser = useSelector((states) => states.authUser);
  const [comment, onCommentChangeEventHandler] = useInput('');

  const onSentCommentEventHandler = () => {
    sendComment(comment);
    onCommentChangeEventHandler({ target: { value: '' } });
  };

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
      {authUser ? (
        <button className="btn" onClick={onSentCommentEventHandler}>
          Sent comment
        </button>
      ) : ''}
    </div>
  );
}
