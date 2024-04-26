import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  SET_DETAIL_THREAD: 'SET_DETAIL_THREAD',
  TOGGLE_UP_VOTE_DETAIL_THREAD: 'TOGGLE_UP_VOTE_DETAIL_THREAD',
  TOGGLE_DOWN_VOTE_DETAIL_THREAD: 'TOGGLE_DOWN_VOTE_DETAIL_THREAD',
  NEUTRALIZE_DETAIL_THREAD_UPVOTE: 'NEUTRALIZE_DETAIL_THREAD_UPVOTE',
  NEUTRALIZE_DETAIL_THREAD_DOWN_VOTE: 'NEUTRALIZE_DETAIL_THREAD_DOWN_VOTE',
};

export function setDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.SET_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

export function toggleUpVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

export function toggleDownVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

export function neutralizeDetailThreadUpVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_DETAIL_THREAD_UPVOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

export function neutralizeDetailThreadDownVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_DETAIL_THREAD_DOWN_VOTE,
    payload: {
      threadId,
      userId,
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
    if (detailThread.upVotesBy.includes(authUser.id)) {
      alreadyUpvoted = true;
    }

    if (alreadyUpvoted) {
      dispatch(neutralizeDetailThreadUpVoteActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.neutralizeThreadVote({ id: threadId });
      } catch (error) {
        alert(error.message);
        dispatch(neutralizeDetailThreadUpVoteActionCreator({ threadId, userId: authUser.id }));
      }

      dispatch(hideLoading());
    } else {
      dispatch(toggleUpVoteDetailThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.upVoteThread({ id: threadId });
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteDetailThreadActionCreator({ threadId, userId: authUser.id }));
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
    if (detailThread.downVotesBy.includes(authUser.id)) {
      alreadyDownvoted = true;
    }

    if (alreadyDownvoted) {
      dispatch(neutralizeDetailThreadDownVoteActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.neutralizeThreadVote({ id: threadId });
      } catch (error) {
        alert(error.message);
        dispatch(neutralizeDetailThreadDownVoteActionCreator({ threadId, userId: authUser.id }));
      }

      dispatch(hideLoading());
    } else {
      dispatch(toggleDownVoteDetailThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.downVoteThread({ id: threadId });
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteDetailThreadActionCreator({ threadId, userId: authUser.id }));
      }

      dispatch(hideLoading());
    }
  };
}
