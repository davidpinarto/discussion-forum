import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { postedAt } from '../utils';
import { asyncUpVoteDetailThreadComment, asyncDownVoteDetailThreadComment } from '../states/detailThread/action';

export function CommentList() {
  const {
    detailThread, authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  const {
    id: threadId, comments,
  } = detailThread;

  const [commentVotes, setCommentVotes] = useState({});

  useEffect(() => {
    /** buat object untuk menampung data comment */
    const initialCommentVotes = {};
    /** iterasi semua comment untuk mendapatkan data apakah sudah di up atau down vote */
    comments.forEach((comment) => {
      const { id, upVotesBy, downVotesBy } = comment;
      /**
       * simpan nilai pada object apakah sudah up vote atau down vote
       * dengan nilai keynya adalah dari id comment yang unik
       */
      initialCommentVotes[id] = {
        alreadyUpvoted: upVotesBy.includes(authUser.id),
        alreadyDownVoted: downVotesBy.includes(authUser.id),
      };
    });
    /** inisiasikan nilainya untuk render pertama */
    setCommentVotes(initialCommentVotes);
  }, [comments, authUser]);

  const handleUpVote = (commentId) => {
    dispatch(asyncUpVoteDetailThreadComment({ threadId, commentId }));
    setCommentVotes((prevVotes) => ({
      ...prevVotes,
      [commentId]: { ...prevVotes[commentId], alreadyUpvoted: true },
    }));
  };

  const handleDownVote = (commentId) => {
    dispatch(asyncDownVoteDetailThreadComment({ threadId, commentId }));
    setCommentVotes((prevVotes) => ({
      ...prevVotes,
      [commentId]: { ...prevVotes[commentId], alreadyDownVoted: true },
    }));
  };

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
              <button className={`likes ${commentVotes[id]?.alreadyUpvoted ? 'liked' : ''}`} onClick={() => handleUpVote(id)}>
                <FaRegThumbsUp />
                {' '}
                {upVotesBy.length}
              </button>
              <button className={`dislikes ${commentVotes[id]?.alreadyDownVoted ? 'disliked' : ''}`} onClick={() => handleDownVote(id)}>
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
