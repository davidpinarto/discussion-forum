import { ActionType } from './action';

export function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_DETAIL_THREAD:
      return action.payload.detailThread;
    default:
      return detailThread;
  }
}
