import { ActionType } from './action';

export function filteredThreadsReducer(filteredThreads = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_FILTERED_THREADS:
      return action.payload.filteredThreads;
    case ActionType.UNSET_FILTERED_THREADS:
      return null;
    default:
      return filteredThreads;
  }
}
