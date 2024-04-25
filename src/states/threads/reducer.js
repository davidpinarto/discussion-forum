import { ActionType } from './action';

export function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.SET_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.newThread, ...threads];
    default:
      return threads;
  }
}
