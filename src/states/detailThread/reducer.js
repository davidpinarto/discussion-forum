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
      return {
        ...detailThread,
        downVotesBy: detailThread.downVotesBy.concat([action.payload.userId]),
      };
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
    case ActionType.TOGGLE_UP_VOTE_DETAIL_THREAD_COMMENT: {
      const { commentId, userId } = action.payload;
      const updatedComments = detailThread.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.concat(userId),
          };
        }
        return comment;
      });
      return {
        ...detailThread,
        comments: updatedComments,
      };
    }
    case ActionType.TOGGLE_DOWN_VOTE_DETAIL_THREAD_COMMENT: {
      const { commentId, userId } = action.payload;
      const updatedComments = detailThread.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.concat(userId),
          };
        }
        return comment;
      });
      return {
        ...detailThread,
        comments: updatedComments,
      };
    }
    case ActionType.NEUTRALIZE_DETAIL_THREAD_COMMENT_UPVOTE: {
      const { commentId, userId: userIdFromPayload } = action.payload;
      const updatedComments = detailThread.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((userId) => userId !== userIdFromPayload),
          };
        }
        return comment;
      });
      return {
        ...detailThread,
        comments: updatedComments,
      };
    }
    case ActionType.NEUTRALIZE_DETAIL_THREAD_COMMENT_DOWN_VOTE_COMMENT: {
      const { commentId, userId: userIdFromPayload } = action.payload;
      const updatedComments = detailThread.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.filter((userId) => userId !== userIdFromPayload),
          };
        }
        return comment;
      });
      return {
        ...detailThread,
        comments: updatedComments,
      };
    }
    default:
      return detailThread;
  }
}
