import React, { useState, useEffect } from 'react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { postedAt } from '../utils';
import { asyncDownVoteThread, asyncUpVoteThread } from '../states/threads/action';

export function ThreadInfo({
  upVotesBy, downVotesBy, totalComments, createdAt, ownerId, threadId,
}) {
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);
  const threads = useSelector((states) => states.threads);
  const dispatch = useDispatch();

  const [alreadyUpvoted, setAlreadyUpvoted] = useState(false);
  const [alreadyDownVoted, setAlreadyDownvoted] = useState(false);

  useEffect(() => {
    const filterThread = threads.filter((thread) => thread.id === threadId);
    if (filterThread.length > 0) {
      const thread = filterThread[0];
      if (authUser) {
        setAlreadyUpvoted(thread.upVotesBy.includes(authUser.id));
        setAlreadyDownvoted(thread.downVotesBy.includes(authUser.id));
      }
    }
  }, [threads, threadId, authUser]);

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
      <button className={`likes ${alreadyUpvoted ? 'liked' : ''}`} onClick={() => dispatch(asyncUpVoteThread(threadId))}>
        <FaRegThumbsUp />
        {' '}
        {upVotesBy}
      </button>
      <button className={`likes ${alreadyDownVoted ? 'disliked' : ''}`} onClick={() => dispatch(asyncDownVoteThread(threadId))}>
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
