import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  SET_LEADERBOARDS: 'SET_LEADERBOARDS',
};

export function setLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.SET_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

export function asyncGetLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(setLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}
