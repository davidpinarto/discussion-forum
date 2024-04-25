import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  SET_THREADS_USERS: 'SET_THREADS_USERS',
};

export function setThreadsUsersActionCreator(threadsUsers) {
  return {
    type: ActionType.SET_THREADS_USERS,
    payload: {
      threadsUsers,
    },
  };
}

export function asyncGetAllThreadsUsers() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threadsUsers = await api.getAllUsers();
      dispatch(setThreadsUsersActionCreator(threadsUsers));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}
