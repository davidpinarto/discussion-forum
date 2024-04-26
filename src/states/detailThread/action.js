import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  SET_DETAIL_THREAD: 'SET_DETAIL_THREAD',
  TOGGLE_UP_VOTE_DETAIL_THREAD: 'TOGGLE_UP_VOTE_DETAIL_THREAD',
  TOGGLE_DOWN_VOTE_DETAIL_THREAD: 'TOGGLE_DOWN_VOTE_DETAIL_THREAD',
  NEUTRALIZE_DETAIL_THREAD_UPVOTE: 'NEUTRALIZE_DETAIL_THREAD_UPVOTE',
  NEUTRALIZE_DETAIL_THREAD_DOWN_VOTE: 'NEUTRALIZE_DETAIL_THREAD_DOWN_VOTE',
  TOGGLE_UP_VOTE_DETAIL_THREAD_COMMENT: 'TOGGLE_UP_VOTE_DETAIL_THREAD_COMMENT',
  TOGGLE_DOWN_VOTE_DETAIL_THREAD_COMMENT: 'TOGGLE_DOWN_VOTE_DETAIL_THREAD_COMMENT',
  NEUTRALIZE_DETAIL_THREAD_COMMENT_UPVOTE: 'NEUTRALIZE_DETAIL_THREAD_COMMENT_UPVOTE',
  NEUTRALIZE_DETAIL_THREAD_COMMENT_DOWN_VOTE_COMMENT: 'NEUTRALIZE_DETAIL_THREAD_COMMENT_DOWN_VOTE_COMMENT',
};

export function setDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.SET_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

export function toggleUpVoteDetailThreadActionCreator({ userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

export function toggleDownVoteDetailThreadActionCreator({ userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

export function neutralizeDetailThreadUpVoteActionCreator({ userId }) {
  return {
    type: ActionType.NEUTRALIZE_DETAIL_THREAD_UPVOTE,
    payload: {
      userId,
    },
  };
}

export function neutralizeDetailThreadDownVoteActionCreator({ userId }) {
  return {
    type: ActionType.NEUTRALIZE_DETAIL_THREAD_DOWN_VOTE,
    payload: {
      userId,
    },
  };
}

export function toggleUpVoteDetailThreadCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_DETAIL_THREAD_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

export function toggleDownVoteDetailThreadCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_DETAIL_THREAD_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

export function neutralizeDetailThreadCommentUpVoteActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_DETAIL_THREAD_COMMENT_UPVOTE,
    payload: {
      userId,
      commentId,
    },
  };
}

export function neutralizeDetailThreadCommentDownVoteActionCreator(
  { commentId, userId },
) {
  return {
    type: ActionType.NEUTRALIZE_DETAIL_THREAD_COMMENT_DOWN_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

export function asyncGetDetailThread(id) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const detailThread = await api.getDetailThread({ id });
      dispatch(setDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export function asyncAddNewCommentOnThread({ id, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.createComment({ id, content });
      alert('Add new comment success!');
      const detailThread = await api.getDetailThread({ id });
      dispatch(setDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export function asyncUpVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread } = getState();

    if (authUser === null) {
      alert('You must be login to vote a thread!');
      dispatch(hideLoading());
      return;
    }

    let alreadyUpvoted = false;
    let alreadyDownVoted = false;

    if (detailThread.upVotesBy.includes(authUser.id)) {
      alreadyUpvoted = true;
    }
    if (detailThread.downVotesBy.includes(authUser.id)) {
      alreadyDownVoted = true;
    }

    if (alreadyUpvoted) {
      dispatch(neutralizeDetailThreadUpVoteActionCreator({ userId: authUser.id }));

      try {
        await api.neutralizeThreadVote({ id: threadId });
      } catch (error) {
        alert(error.message);
        dispatch(neutralizeDetailThreadUpVoteActionCreator({ userId: authUser.id }));
      }

      dispatch(hideLoading());
    } else {
      if (alreadyDownVoted) {
        dispatch(neutralizeDetailThreadDownVoteActionCreator({ userId: authUser.id }));
      }

      dispatch(toggleUpVoteDetailThreadActionCreator({ userId: authUser.id }));

      try {
        await api.upVoteThread({ id: threadId });
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteDetailThreadActionCreator({ userId: authUser.id }));
      }

      dispatch(hideLoading());
    }
  };
}

export function asyncDownVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread } = getState();

    if (authUser === null) {
      alert('You must be login to vote a thread!');
      dispatch(hideLoading());
      return;
    }

    let alreadyDownvoted = false;
    let alreadyUpvoted = false;

    if (detailThread.downVotesBy.includes(authUser.id)) {
      alreadyDownvoted = true;
    }
    if (detailThread.upVotesBy.includes(authUser.id)) {
      alreadyUpvoted = true;
    }

    if (alreadyDownvoted) {
      dispatch(neutralizeDetailThreadDownVoteActionCreator({ userId: authUser.id }));

      try {
        await api.neutralizeThreadVote({ id: threadId });
      } catch (error) {
        alert(error.message);
        dispatch(neutralizeDetailThreadDownVoteActionCreator({ userId: authUser.id }));
      }

      dispatch(hideLoading());
    } else {
      if (alreadyUpvoted) {
        dispatch(neutralizeDetailThreadUpVoteActionCreator({ userId: authUser.id }));
      }

      dispatch(toggleDownVoteDetailThreadActionCreator({ userId: authUser.id }));

      try {
        await api.downVoteThread({ id: threadId });
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteDetailThreadActionCreator({ userId: authUser.id }));
      }

      dispatch(hideLoading());
    }
  };
}

export function asyncUpVoteDetailThreadComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread: { comments } } = getState();

    if (authUser === null) {
      alert('You must be login to vote a comment thread!');
      dispatch(hideLoading());
      return;
    }

    const filterComment = comments.filter((comment) => comment.id === commentId);

    let alreadyUpvoted = false;
    let alreadyDownVoted = false;

    if (filterComment[0].upVotesBy.includes(authUser.id)) {
      alreadyUpvoted = true;
    }
    if (filterComment[0].downVotesBy.includes(authUser.id)) {
      alreadyDownVoted = true;
    }

    if (alreadyUpvoted) {
      dispatch(neutralizeDetailThreadCommentUpVoteActionCreator(
        { commentId, userId: authUser.id },
      ));

      try {
        await api.neutralizeCommentVote({ threadId, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(neutralizeDetailThreadCommentUpVoteActionCreator(
          { commentId, userId: authUser.id },
        ));
      }

      dispatch(hideLoading());
    } else {
      if (alreadyDownVoted) {
        dispatch(neutralizeDetailThreadCommentDownVoteActionCreator(
          { commentId, userId: authUser.id },
        ));
      }

      dispatch(toggleUpVoteDetailThreadCommentActionCreator(
        { commentId, userId: authUser.id },
      ));

      try {
        await api.upVoteComment({ threadId, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteDetailThreadCommentActionCreator(
          { commentId, userId: authUser.id },
        ));
      }

      dispatch(hideLoading());
    }
  };
}

export function asyncDownVoteDetailThreadComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread: { comments } } = getState();

    if (authUser === null) {
      alert('You must be login to vote a comment thread!');
      dispatch(hideLoading());
      return;
    }

    const filterComment = comments.filter((comment) => comment.id === commentId);

    let alreadyDownvoted = false;
    let alreadyUpvoted = false;

    if (filterComment[0].downVotesBy.includes(authUser.id)) {
      alreadyDownvoted = true;
    }
    if (filterComment[0].upVotesBy.includes(authUser.id)) {
      alreadyUpvoted = true;
    }

    if (alreadyDownvoted) {
      dispatch(neutralizeDetailThreadCommentDownVoteActionCreator(
        { commentId, userId: authUser.id },
      ));

      try {
        await api.neutralizeCommentVote({ threadId, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(neutralizeDetailThreadCommentDownVoteActionCreator(
          { commentId, userId: authUser.id },
        ));
      }

      dispatch(hideLoading());
    } else {
      if (alreadyUpvoted) {
        dispatch(neutralizeDetailThreadCommentUpVoteActionCreator(
          { commentId, userId: authUser.id },
        ));
      }

      dispatch(toggleDownVoteDetailThreadCommentActionCreator(
        { commentId, userId: authUser.id },
      ));

      try {
        await api.downVoteComment({ threadId, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteDetailThreadCommentActionCreator(
          { commentId, userId: authUser.id },
        ));
      }

      dispatch(hideLoading());
    }
  };
}
