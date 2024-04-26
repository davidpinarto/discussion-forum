import { ActionType } from './action';

export function leaderboardsReducer(leaderboards = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_LEADERBOARDS:
      return action.payload.leaderboards;
    default:
      return leaderboards;
  }
}
