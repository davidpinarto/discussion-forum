import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function GiveComment() {
  const { authUser } = useSelector((states) => states);

  return (
    <div className="give-comment">
      <h3>Give Comment</h3>
      {authUser
        ? <textarea name="comment" id="comment-input" cols="30" rows="10" />
        : (
          <p>
            You should
            {' '}
            <Link to="/login">Login</Link>
            {' '}
            to give a comment
          </p>
        )}
      {authUser ? <button className="btn">Sent comment</button> : ''}
    </div>
  );
}
