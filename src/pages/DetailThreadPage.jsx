import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { asyncGetDetailThread, asyncAddNewCommentOnThread } from '../states/detailThread/action';
import { asyncGetAllUsers } from '../states/users/action';
import { CommentList } from '../components/CommentList';
import { DetailThread } from '../components/DetailThread';
import { GiveComment } from '../components/GiveComment';

export function DetailThreadPage() {
  const {
    detailThread,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  const { id } = useParams();

  React.useEffect(() => {
    dispatch(asyncGetDetailThread(id));
    dispatch(asyncGetAllUsers());
  }, [dispatch]);

  if (detailThread === null) {
    return null;
  }

  const {
    title, body, upVotesBy, downVotesBy, createdAt, owner: { name, avatar },
  } = detailThread;

  const sendComment = async (comment) => {
    dispatch(asyncAddNewCommentOnThread({ id, content: comment }));
  };

  return (
    <div className="detail-page">
      <DetailThread
        threadId={id}
        title={title}
        body={body}
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        createdAt={createdAt}
        ownerName={name}
        avatar={avatar}
      />
      <GiveComment sendComment={sendComment} />
      <div className="detail-comments">
        <h3>Comments</h3>
        <CommentList />
      </div>
    </div>
  );
}
