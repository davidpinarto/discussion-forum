import React, { useState, useEffect } from 'react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { postedAt } from '../utils';
import { asyncUpVoteDetailThread, asyncDownVoteDetailThread } from '../states/detailThread/action';

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
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  const [alreadyUpvoted, setAlreadyUpvoted] = useState(false);
  const [alreadyDownVoted, setAlreadyDownVoted] = useState(false);

  useEffect(() => {
    if (authUser) {
      setAlreadyUpvoted(upVotesBy.includes(authUser.id));
      setAlreadyDownVoted(downVotesBy.includes(authUser.id));
    }
  }, [upVotesBy, downVotesBy, authUser]);

  return (
    <div className="detail-thread">
      <h2>{title}</h2>
      <div className="thread-body">
        {body}
      </div>
      <div className="thread-info">
        <button className={`likes ${alreadyUpvoted ? 'liked' : ''}`} onClick={() => dispatch(asyncUpVoteDetailThread(threadId))}>
          <FaRegThumbsUp />
          {' '}
          {upVotesBy.length}
        </button>
        <button className={`dislikes ${alreadyDownVoted ? 'disliked' : ''}`} onClick={() => dispatch(asyncDownVoteDetailThread(threadId))}>
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
