import { ActionType } from './action';

export function threadsUsersReducer(threadsUsers = [], action = {}) {
  switch (action.type) {
    case ActionType.SET_THREADS_USERS:
      return action.payload.threadsUsers;
    default:
      return threadsUsers;
  }
}
