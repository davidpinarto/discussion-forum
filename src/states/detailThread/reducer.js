import { ActionType } from './action';

export function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_DETAIL_THREAD:
      return action.payload.detailThread;
    case ActionType.TOGGLE_UP_VOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.concat([action.payload.userId]),
      };
    case ActionType.TOGGLE_DOWN_VOTE_DETAIL_THREAD:
      if (detailThread.id === action.payload.threadId) {
        return {
          ...detailThread,
          downVotesBy: detailThread.downVotesBy.concat([action.payload.userId]),
        };
      }
      break;
    case ActionType.NEUTRALIZE_DETAIL_THREAD_UPVOTE:
      const { upVotesBy } = detailThread;
      const updatedUpVotesBy = upVotesBy.filter(
        (userId) => userId !== action.payload.userId,
      );
      return {
        ...detailThread,
        upVotesBy: updatedUpVotesBy,
      };
    case ActionType.NEUTRALIZE_DETAIL_THREAD_DOWN_VOTE:
      const { downVotesBy } = detailThread;
      const updatedDownVotesBy = downVotesBy.filter(
        (userId) => userId !== action.payload.userId,
      );
      return {
        ...detailThread,
        downVotesBy: updatedDownVotesBy,
      };
    default:
      return detailThread;
  }
}
