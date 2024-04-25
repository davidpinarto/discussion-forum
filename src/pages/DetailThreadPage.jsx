import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { asyncGetDetailThread } from '../states/detailThread/action';
import { asyncGetAllThreadsUsers } from '../states/threadsUsers/action';
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
    dispatch(asyncGetAllThreadsUsers());
  }, [dispatch]);

  if (detailThread === null) {
    return null;
  }

  const {
    title, body, upVotesBy, downVotesBy, createdAt, owner: { name },
  } = detailThread;

  return (
    <div className="detail-page">
      <DetailThread
        title={title}
        body={body}
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        createdAt={createdAt}
        ownerName={name}
      />
      <GiveComment />
      <div className="detail-comments">
        <h3>Comments</h3>
        <CommentList />
      </div>
    </div>
  );
}
