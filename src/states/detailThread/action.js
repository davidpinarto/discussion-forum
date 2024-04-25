import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  SET_DETAIL_THREAD: 'SET_DETAIL_THREAD',
};

export function setDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.SET_DETAIL_THREAD,
    payload: {
      detailThread,
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
