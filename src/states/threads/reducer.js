import { ActionType } from './action';

export function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.SET_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.newThread, ...threads];
    case ActionType.TOGGLE_UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.concat([action.payload.userId]),
          };
        }
        return thread;
      });
    case ActionType.TOGGLE_DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.concat([action.payload.userId]),
          };
        }
        return thread;
      });
    case ActionType.NEUTRALIZE_THREAD_UPVOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const { upVotesBy } = thread;
          const updatedUpVotesBy = upVotesBy.filter(
            (userId) => userId !== action.payload.userId,
          );

          return {
            ...thread,
            upVotesBy: updatedUpVotesBy,
          };
        }
        return thread;
      });
    case ActionType.NEUTRALIZE_THREAD_DOWN_VOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const { downVotesBy } = thread;
          const updatedDownVotesBy = downVotesBy.filter(
            (userId) => userId !== action.payload.userId,
          );

          return {
            ...thread,
            downVotesBy: updatedDownVotesBy,
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}
