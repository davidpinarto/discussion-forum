/**
 * #detailThread thunks
 * - asyncGetDetailThread thunk
 *   - should dispatch action correctly and set detailThread when data fetching is success
 *   - should dispatch action correctly and call alert correctly when data fetching failed
 * - asyncAddNewCommentOnThread thunk
 *   - should dispatch action correctly, create new comment, call alert,
 *     and set new detailThread when data fetching is success
 *   - should dispatch action correctly and call alert correctly when data fetching failed
 * - asyncUpVoteDetailThread thunk
 *   - should call alert when authUser state is null
 *   - when user already up vote the thread:
 *     - should neutralize up vote when user already up vote the thread
 *     - should call alert when data fetching is failed and undo the neutralize up vote
 *   - when user has not up voted the thread:
 *     - when user already down vote the thread:
 *       - should neutralize down vote when user already down vote the thread
 *     - should dispatch action correctly and up vote the thread when data fetching is success
 *     - should call alert when data fetching is failed and undo the neutralize up vote
 * - asyncDownVoteDetailThread thunk
 *   - should call alert when authUser state is null
 *   - when user already down vote the thread:
 *     - should neutralize down vote when user already down vote the thread
 *     - should call alert when data fetching is failed and undo the neutralize down vote
 *   - when user has not down voted the thread:
 *     - when user already up vote the thread:
 *       - should neutralize up vote when user already up vote the thread
 *     - should dispatch action correctly and down vote the thread when data fetching is success
 *     - should call alert when data fetching is failed and undo the neutralize down vote
 * - asyncUpVoteDetailThreadComment thunk
 *   - should call alert when authUser state is null
 *   - when user already up vote the comment:
 *     - should neutralize up vote when user already up vote the comment
 *     - should call alert when data fetching is failed and undo the neutralize up vote
 *   - when user has not up voted the comment:
 *     - when user already down vote the comment:
 *       - should neutralize down vote when user already down vote the comment
 *     - should dispatch action correctly and up vote the comment when data fetching is success
 *     - should call alert when data fetching is failed and undo the neutralize up vote
 * - asyncDownVoteDetailThreadComment thunk
 *   - should call alert when authUser state is null
 *   - when user already down vote the comment:
 *     - should neutralize down vote when user already down vote the comment
 *     - should call alert when data fetching is failed and undo the neutralize down vote
 *   - when user has not down voted the comment:
 *     - when user already up vote the comment:
 *       - should neutralize up vote when user already up vote the comment
 *     - should dispatch action correctly and down vote the comment when data fetching is success
 *     - should call alert when data fetching is failed and undo the neutralize down vote
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  setDetailThreadActionCreator,
  asyncGetDetailThread,
  asyncAddNewCommentOnThread,
  asyncUpVoteDetailThread,
  neutralizeDetailThreadUpVoteActionCreator,
  neutralizeDetailThreadDownVoteActionCreator,
  toggleUpVoteDetailThreadActionCreator,
  asyncDownVoteDetailThread,
  toggleDownVoteDetailThreadActionCreator,
  asyncUpVoteDetailThreadComment,
  neutralizeDetailThreadCommentUpVoteActionCreator,
  toggleUpVoteDetailThreadCommentActionCreator,
  neutralizeDetailThreadCommentDownVoteActionCreator,
  asyncDownVoteDetailThreadComment,
  toggleDownVoteDetailThreadCommentActionCreator,
} from './action';

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('detailThread thunks', () => {
  let initialState = null;

  beforeEach(() => {
    initialState = {
      authUser: null,
      detailThread: {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };
  });

  afterEach(() => {
    initialState = null;
  });

  describe('asyncGetDetailThread thunk', () => {
    beforeEach(() => {
      api._getDetailThread = api.getDetailThread;
    });

    afterEach(() => {
      api.getDetailThread = api._getDetailThread;

      delete api._getDetailThread;
    });

    it('should dispatch action correctly and set detailThread when data fetching is success', async () => {
      const fakeDetailThreadResponse = {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      };
      api.getDetailThread = () => Promise.resolve(fakeDetailThreadResponse);

      const dispatch = vi.fn();

      await asyncGetDetailThread('thread-1')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(setDetailThreadActionCreator(fakeDetailThreadResponse));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action correctly and call alert correctly when data fetching failed', async () => {
      api.getDetailThread = () => Promise.reject(fakeErrorResponse);

      const dispatch = vi.fn();
      window.alert = vi.fn();

      await asyncGetDetailThread('thread-1')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });

  describe('asyncAddNewCommentOnThread thunk', () => {
    beforeEach(() => {
      api._createComment = api.createComment;
      api._getDetailThread = api.getDetailThread;
    });

    afterEach(() => {
      api.getDetailThread = api._getDetailThread;
      api.createComment = api._createComment;

      delete api._getDetailThread;
      delete api._createComment;
    });

    it('should dispatch action correctly, create new comment, call alert, and set new detailThread when data fetching is success', async () => {
      const fakeDetailThreadResponse = {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'this is comment',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      };
      api.createComment = () => Promise.resolve();
      api.getDetailThread = () => Promise.resolve(fakeDetailThreadResponse);
      const fakePayload = { id: 'thread-123', content: 'this is comment' };

      const dispatch = vi.fn();
      const spyAlert = vi.spyOn(window, 'alert');

      await asyncAddNewCommentOnThread(fakePayload)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(setDetailThreadActionCreator(fakeDetailThreadResponse));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(spyAlert).toHaveBeenCalledWith('Add new comment success!');
    });

    it('should dispatch action correctly and call alert correctly when data fetching failed', async () => {
      api.createComment = () => Promise.reject(fakeErrorResponse);
      const fakePayload = { id: 'thread-123', content: 'this is comment' };

      const dispatch = vi.fn();
      window.alert = vi.fn();

      await asyncAddNewCommentOnThread(fakePayload)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });

  describe('asyncUpVoteDetailThread thunk', () => {
    beforeEach(() => {
      api._neutralizeThreadVote = api.neutralizeThreadVote;
      api._upVoteThread = api.upVoteThread;
    });

    afterEach(() => {
      api.neutralizeThreadVote = api._neutralizeThreadVote;
      api.upVoteThread = api._upVoteThread;

      delete api._neutralizeThreadVote;
      delete api._upVoteThread;
    });

    it('should call alert when authUser state is null', async () => {
      const getState = vi.fn(() => initialState);
      const dispatch = vi.fn();
      const spyAlert = vi.spyOn(window, 'alert');

      await asyncUpVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(spyAlert).toHaveBeenCalledWith('You must be login to vote a thread!');
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should neutralize up vote when user already up vote the thread', async () => {
      const getState = vi.fn(() => ({
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        detailThread: {
          ...initialState.detailThread,
          upVotesBy: ['users-1'],
        },
      }));
      const dispatch = vi.fn();
      api.neutralizeThreadVote = () => Promise.resolve({
        id: 'vote-1',
        userId: 'users-1',
        threadId: 'thread-1',
        voteType: 0,
      });

      await asyncUpVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(neutralizeDetailThreadUpVoteActionCreator({ userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should call alert when data fetching is failed and undo the neutralize up vote', async () => {
      const getState = vi.fn(() => ({
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        detailThread: {
          ...initialState.detailThread,
          upVotesBy: ['users-1'],
        },
      }));
      const dispatch = vi.fn();
      window.alert = vi.fn();
      api.neutralizeThreadVote = () => Promise.reject(fakeErrorResponse);

      await asyncUpVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(neutralizeDetailThreadUpVoteActionCreator({ userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(getState).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });

    it('should neutralize down vote when user already down vote the thread', async () => {
      const getState = vi.fn(() => ({
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        detailThread: {
          ...initialState.detailThread,
          downVotesBy: ['users-1'],
        },
      }));
      const dispatch = vi.fn();
      api.upVoteThread = () => Promise.resolve({
        id: 'vote-1',
        userId: 'users-1',
        threadId: 'thread-1',
        voteType: 1,
      });

      await asyncUpVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(neutralizeDetailThreadDownVoteActionCreator({ userId: 'users-1' }));
      expect(dispatch)
        .toHaveBeenCalledWith(toggleUpVoteDetailThreadActionCreator({ userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should dispatch action correctly and up vote the thread when data fetching is success', async () => {
      const getState = vi.fn(() => ({
        ...initialState,
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      }));
      const dispatch = vi.fn();
      api.upVoteThread = () => Promise.resolve({
        id: 'vote-1',
        userId: 'users-1',
        threadId: 'thread-1',
        voteType: 1,
      });

      await asyncUpVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(toggleUpVoteDetailThreadActionCreator({ userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should call alert when data fetching is failed and undo the neutralize up vote', async () => {
      const getState = vi.fn(() => ({
        ...initialState,
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      }));
      const dispatch = vi.fn();
      window.alert = vi.fn();
      api.upVoteThread = () => Promise.reject(fakeErrorResponse);

      await asyncUpVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(toggleUpVoteDetailThreadActionCreator({ userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(getState).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });

  describe('asyncDownVoteDetailThread thunk', () => {
    beforeEach(() => {
      api._neutralizeThreadVote = api.neutralizeThreadVote;
      api._downVoteThread = api.downVoteThread;
    });

    afterEach(() => {
      api.neutralizeThreadVote = api._neutralizeThreadVote;
      api.downVoteThread = api._downVoteThread;

      delete api._neutralizeThreadVote;
      delete api._downVoteThread;
    });

    it('should call alert when authUser state is null', async () => {
      const getState = vi.fn(() => initialState);
      const dispatch = vi.fn();
      const spyAlert = vi.spyOn(window, 'alert');

      await asyncDownVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(spyAlert).toHaveBeenCalledWith('You must be login to vote a thread!');
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should neutralize down vote when user already down vote the thread', async () => {
      const getState = vi.fn(() => ({
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        detailThread: {
          ...initialState.detailThread,
          downVotesBy: ['users-1'],
        },
      }));
      const dispatch = vi.fn();
      api.neutralizeThreadVote = () => Promise.resolve({
        id: 'vote-1',
        userId: 'users-1',
        threadId: 'thread-1',
        voteType: 0,
      });

      await asyncDownVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(neutralizeDetailThreadDownVoteActionCreator({ userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should call alert when data fetching is failed and undo the neutralize down vote', async () => {
      const getState = vi.fn(() => ({
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        detailThread: {
          ...initialState.detailThread,
          downVotesBy: ['users-1'],
        },
      }));
      const dispatch = vi.fn();
      window.alert = vi.fn();
      api.neutralizeThreadVote = () => Promise.reject(fakeErrorResponse);

      await asyncDownVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(neutralizeDetailThreadDownVoteActionCreator({ userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(getState).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });

    it('should neutralize up vote when user already up vote the thread', async () => {
      const getState = vi.fn(() => ({
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        detailThread: {
          ...initialState.detailThread,
          upVotesBy: ['users-1'],
        },
      }));
      const dispatch = vi.fn();
      api.downVoteThread = () => Promise.resolve({
        id: 'vote-1',
        userId: 'users-1',
        threadId: 'thread-1',
        voteType: -1,
      });

      await asyncDownVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(neutralizeDetailThreadUpVoteActionCreator({ userId: 'users-1' }));
      expect(dispatch)
        .toHaveBeenCalledWith(toggleDownVoteDetailThreadActionCreator({ userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should dispatch action correctly and down vote the thread when data fetching is success', async () => {
      const getState = vi.fn(() => ({
        ...initialState,
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      }));
      const dispatch = vi.fn();
      api.downVoteThread = () => Promise.resolve({
        id: 'vote-1',
        userId: 'users-1',
        threadId: 'thread-1',
        voteType: -1,
      });

      await asyncDownVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(toggleDownVoteDetailThreadActionCreator({ userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should call alert when data fetching is failed and undo the neutralize down vote', async () => {
      const getState = vi.fn(() => ({
        ...initialState,
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      }));
      const dispatch = vi.fn();
      window.alert = vi.fn();
      api.downVoteThread = () => Promise.reject(fakeErrorResponse);

      await asyncDownVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(toggleDownVoteDetailThreadActionCreator({ userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(getState).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });

  describe('asyncUpVoteDetailThreadComment thunk', () => {
    beforeEach(() => {
      api._neutralizeCommentVote = api.neutralizeCommentVote;
      api._upVoteComment = api.upVoteComment;
    });

    afterEach(() => {
      api.neutralizeCommentVote = api._neutralizeCommentVote;
      api.upVoteComment = api._upVoteComment;

      delete api._neutralizeCommentVote;
      delete api._upVoteComment;
    });

    it('should call alert when authUser state is null', async () => {
      const getState = vi.fn(() => initialState);
      const dispatch = vi.fn();
      const spyAlert = vi.spyOn(window, 'alert');

      await asyncUpVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(spyAlert).toHaveBeenCalledWith('You must be login to vote a comment thread!');
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should neutralize up vote when user already up vote the comment', async () => {
      const getState = vi.fn(() => ({
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        detailThread: {
          ...initialState.detailThread,
          comments: [
            {
              ...initialState.detailThread.comments[0],
              upVotesBy: ['users-1'],
            },
          ],
        },
      }));
      const dispatch = vi.fn();
      api.neutralizeCommentVote = () => Promise.resolve({
        id: 'vote-1',
        userId: 'users-1',
        commentId: 'comment-1',
        voteType: 0,
      });

      await asyncUpVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(neutralizeDetailThreadCommentUpVoteActionCreator({ commentId: 'comment-1', userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should call alert when data fetching is failed and undo the neutralize up vote', async () => {
      const getState = vi.fn(() => ({
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        detailThread: {
          ...initialState.detailThread,
          comments: [
            {
              ...initialState.detailThread.comments[0],
              upVotesBy: ['users-1'],
            },
          ],
        },
      }));
      const dispatch = vi.fn();
      window.alert = vi.fn();
      api.neutralizeCommentVote = () => Promise.reject(fakeErrorResponse);

      await asyncUpVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(neutralizeDetailThreadCommentUpVoteActionCreator({ commentId: 'comment-1', userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(getState).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });

    it('should neutralize down vote when user already down vote the comment', async () => {
      const getState = vi.fn(() => ({
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        detailThread: {
          ...initialState.detailThread,
          comments: [
            {
              ...initialState.detailThread.comments[0],
              downVotesBy: ['users-1'],
            },
          ],
        },
      }));
      const dispatch = vi.fn();
      api.upVoteComment = () => Promise.resolve({
        id: 'vote-1',
        userId: 'users-1',
        commentId: 'comment-1',
        voteType: 1,
      });

      await asyncUpVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(neutralizeDetailThreadCommentDownVoteActionCreator({ commentId: 'comment-1', userId: 'users-1' }));
      expect(dispatch)
        .toHaveBeenCalledWith(toggleUpVoteDetailThreadCommentActionCreator({ commentId: 'comment-1', userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should dispatch action correctly and up vote the comment when data fetching is success', async () => {
      const getState = vi.fn(() => ({
        ...initialState,
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      }));
      const dispatch = vi.fn();
      api.upVoteComment = () => Promise.resolve({
        id: 'vote-1',
        userId: 'users-1',
        commentId: 'comment-1',
        voteType: 1,
      });

      await asyncUpVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(toggleUpVoteDetailThreadCommentActionCreator({ commentId: 'comment-1', userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should call alert when data fetching is failed and undo the neutralize up vote', async () => {
      const getState = vi.fn(() => ({
        ...initialState,
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      }));
      const dispatch = vi.fn();
      window.alert = vi.fn();
      api.upVoteComment = () => Promise.reject(fakeErrorResponse);

      await asyncUpVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(toggleUpVoteDetailThreadCommentActionCreator({ commentId: 'comment-1', userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(getState).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });

  describe('asyncDownVoteDetailThreadComment thunk', () => {
    beforeEach(() => {
      api._neutralizeCommentVote = api.neutralizeCommentVote;
      api._downVoteComment = api.downVoteComment;
    });

    afterEach(() => {
      api.neutralizeCommentVote = api._neutralizeCommentVote;
      api.downVoteComment = api._downVoteComment;

      delete api._neutralizeCommentVote;
      delete api._downVoteComment;
    });

    it('should call alert when authUser state is null', async () => {
      const getState = vi.fn(() => initialState);
      const dispatch = vi.fn();
      const spyAlert = vi.spyOn(window, 'alert');

      await asyncDownVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(spyAlert).toHaveBeenCalledWith('You must be login to vote a comment thread!');
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should neutralize down vote when user already down vote the comment', async () => {
      const getState = vi.fn(() => ({
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        detailThread: {
          ...initialState.detailThread,
          comments: [
            {
              ...initialState.detailThread.comments[0],
              downVotesBy: ['users-1'],
            },
          ],
        },
      }));
      const dispatch = vi.fn();
      api.neutralizeCommentVote = () => Promise.resolve({
        id: 'vote-1',
        userId: 'users-1',
        commentId: 'comment-1',
        voteType: 0,
      });

      await asyncDownVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(neutralizeDetailThreadCommentDownVoteActionCreator({ commentId: 'comment-1', userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should call alert when data fetching is failed and undo the neutralize down vote', async () => {
      const getState = vi.fn(() => ({
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        detailThread: {
          ...initialState.detailThread,
          comments: [
            {
              ...initialState.detailThread.comments[0],
              downVotesBy: ['users-1'],
            },
          ],
        },
      }));
      const dispatch = vi.fn();
      window.alert = vi.fn();
      api.neutralizeCommentVote = () => Promise.reject(fakeErrorResponse);

      await asyncDownVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(neutralizeDetailThreadCommentDownVoteActionCreator({ commentId: 'comment-1', userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(getState).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });

    it('should neutralize up vote when user already up vote the comment', async () => {
      const getState = vi.fn(() => ({
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        detailThread: {
          ...initialState.detailThread,
          comments: [
            {
              ...initialState.detailThread.comments[0],
              upVotesBy: ['users-1'],
            },
          ],
        },
      }));
      const dispatch = vi.fn();
      api.downVoteComment = () => Promise.resolve({
        id: 'vote-1',
        userId: 'users-1',
        commentId: 'comment-1',
        voteType: -1,
      });

      await asyncDownVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(neutralizeDetailThreadCommentUpVoteActionCreator({ commentId: 'comment-1', userId: 'users-1' }));
      expect(dispatch)
        .toHaveBeenCalledWith(toggleDownVoteDetailThreadCommentActionCreator({ commentId: 'comment-1', userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should dispatch action correctly and down vote the comment when data fetching is success', async () => {
      const getState = vi.fn(() => ({
        ...initialState,
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      }));
      const dispatch = vi.fn();
      api.downVoteComment = () => Promise.resolve({
        id: 'vote-1',
        userId: 'users-1',
        commentId: 'comment-1',
        voteType: -1,
      });

      await asyncDownVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(toggleDownVoteDetailThreadCommentActionCreator({ commentId: 'comment-1', userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should call alert when data fetching is failed and undo the neutralize down vote', async () => {
      const getState = vi.fn(() => ({
        ...initialState,
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      }));
      const dispatch = vi.fn();
      window.alert = vi.fn();
      api.downVoteComment = () => Promise.reject(fakeErrorResponse);

      await asyncDownVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch)
        .toHaveBeenCalledWith(toggleDownVoteDetailThreadCommentActionCreator({ commentId: 'comment-1', userId: 'users-1' }));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(getState).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });
});
