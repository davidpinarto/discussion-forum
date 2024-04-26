import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  SET_THREADS: 'SET_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UP_VOTE_THREAD: 'TOGGLE_UP_VOTE_THREAD',
  TOGGLE_DOWN_VOTE_THREAD: 'TOGGLE_DOWN_VOTE_THREAD',
  NEUTRALIZE_THREAD_UPVOTE: 'NEUTRALIZE_THREAD_UPVOTE',
  NEUTRALIZE_THREAD_DOWN_VOTE: 'NEUTRALIZE_THREAD_DOWN_VOTE',
};

export function setThreadsActionCreator(threads) {
  return {
    type: ActionType.SET_THREADS,
    payload: {
      threads,
    },
  };
}

export function addThreadActionCreator(newThread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      newThread,
    },
  };
}

export function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

export function toggleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

export function neutralizeThreadUpVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_UPVOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

export function neutralizeThreadDownVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_DOWN_VOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

export function asyncGetAllThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threads = await api.getAllThreads();
      dispatch(setThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export function asyncAddNewThreads(newThreadData) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const newThread = await api.createThread(newThreadData);
      alert('Add new thread success!');
      dispatch(addThreadActionCreator(newThread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threads } = getState();

    if (authUser === null) {
      alert('You must be login to vote a thread!');
      dispatch(hideLoading());
      return;
    }

    const filterThread = threads.filter((thread) => thread.id === threadId);

    let alreadyUpvoted = false;
    if (filterThread[0].upVotesBy.includes(authUser.id)) {
      alreadyUpvoted = true;
    }

    if (alreadyUpvoted) {
      dispatch(neutralizeThreadUpVoteActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.neutralizeThreadVote({ id: threadId });
      } catch (error) {
        alert(error.message);
        dispatch(neutralizeThreadUpVoteActionCreator({ threadId, userId: authUser.id }));
      }

      dispatch(hideLoading());
    } else {
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.upVoteThread({ id: threadId });
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }

      dispatch(hideLoading());
    }
  };
}

export function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threads } = getState();

    if (authUser === null) {
      alert('You must be login to vote a thread!');
      dispatch(hideLoading());
      return;
    }

    const filterThread = threads.filter((thread) => thread.id === threadId);

    let alreadyDownvoted = false;
    if (filterThread[0].downVotesBy.includes(authUser.id)) {
      alreadyDownvoted = true;
    }

    if (alreadyDownvoted) {
      dispatch(neutralizeThreadDownVoteActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.neutralizeThreadVote({ id: threadId });
      } catch (error) {
        alert(error.message);
        dispatch(neutralizeThreadDownVoteActionCreator({ threadId, userId: authUser.id }));
      }

      dispatch(hideLoading());
    } else {
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.downVoteThread({ id: threadId });
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }

      dispatch(hideLoading());
    }
  };
}
