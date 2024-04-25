import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  SET_THREADS: 'SET_THREADS',
  ADD_THREAD: 'ADD_THREAD',
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
