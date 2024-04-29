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
  describe('asyncGetDetailThread thunk', () => {
    beforeEach(() => {
      api._getDetailThread = api.getDetailThread;
    });

    afterEach(() => {
      api.getDetailThread = api._getDetailThread;

      delete api._getDetailThread;
    });

    it('should dispatch action correctly when data fetching success', async () => {
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
      const fakeId = 'user-123';

      const dispatch = vi.fn();

      await asyncGetDetailThread(fakeId)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(setDetailThreadActionCreator(fakeDetailThreadResponse));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
      api.getDetailThread = () => Promise.reject(fakeErrorResponse);
      const fakeId = 'user-123';

      const dispatch = vi.fn();
      window.alert = vi.fn();

      await asyncGetDetailThread(fakeId)(dispatch);

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

    it('should dispatch action correctly when data fetching success', async () => {
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

    it('should dispatch action correctly when data fetching success', async () => {
      api.createComment = () => Promise.reject(fakeErrorResponse);
      api.getDetailThread = () => Promise.resolve(fakeErrorResponse);
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

    it('should alert You must be login to vote a thread! when authUser is null', async () => {
      const initialState = {
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

      const getState = vi.fn(() => initialState);
      const dispatch = vi.fn();
      const spyAlert = vi.spyOn(window, 'alert');

      await asyncUpVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(spyAlert).toHaveBeenCalledWith('You must be login to vote a thread!');
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should neutralize detail thread UpVote when user already upvote the thread', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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
          upVotesBy: ['users-1'],
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

      const getState = vi.fn(() => initialState);
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

    it('should alert error message and undo neutralize detail thread UpVote when data fetching failed', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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
          upVotesBy: ['users-1'],
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

      const getState = vi.fn(() => initialState);
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

    it('should up vote detail thread', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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

      const getState = vi.fn(() => initialState);
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

    it('should up vote detail thread and neutralize down vote when user already down vote detail thread', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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
          downVotesBy: ['users-1'],
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

      const getState = vi.fn(() => initialState);
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

    it('should undo up vote detail thread when data fetching is fail', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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

      const getState = vi.fn(() => initialState);
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

    it('should alert You must be login to vote a thread! when authUser is null', async () => {
      const initialState = {
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

      const getState = vi.fn(() => initialState);
      const dispatch = vi.fn();
      const spyAlert = vi.spyOn(window, 'alert');

      await asyncDownVoteDetailThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(spyAlert).toHaveBeenCalledWith('You must be login to vote a thread!');
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should neutralize detail thread downVote when user already downvote the thread', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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
          downVotesBy: ['users-1'],
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

      const getState = vi.fn(() => initialState);
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

    it('should alert error message and undo neutralize detail thread down vote when data fetching failed', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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
          downVotesBy: ['users-1'],
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

      const getState = vi.fn(() => initialState);
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

    it('should down vote detail thread', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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

      const getState = vi.fn(() => initialState);
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

    it('should down vote detail thread and neutralize up vote when user already up vote detail thread', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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
          upVotesBy: ['users-1'],
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

      const getState = vi.fn(() => initialState);
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

    it('should undo down vote detail thread when data fetching is fail', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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

      const getState = vi.fn(() => initialState);
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

    it('should alert You must be login to vote a comment thread! when authUser is null', async () => {
      const initialState = {
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

      const getState = vi.fn(() => initialState);
      const dispatch = vi.fn();
      const spyAlert = vi.spyOn(window, 'alert');

      await asyncUpVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(spyAlert).toHaveBeenCalledWith('You must be login to vote a comment thread!');
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should neutralize detail thread comment UpVote when user already upvote the comment in the thread', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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
              upVotesBy: ['users-1'],
              downVotesBy: [],
            },
          ],
        },
      };

      const getState = vi.fn(() => initialState);
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

    it('should alert error message and undo neutralize detail thread comment UpVote when data fetching failed', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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
              upVotesBy: ['users-1'],
              downVotesBy: [],
            },
          ],
        },
      };

      const getState = vi.fn(() => initialState);
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

    it('should up vote detail thread comment', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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

      const getState = vi.fn(() => initialState);
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

    it('should up vote detail thread comment and neutralize down vote comment when user already down vote comment', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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
              downVotesBy: ['users-1'],
            },
          ],
        },
      };

      const getState = vi.fn(() => initialState);
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

    it('should undo up vote detail thread comment when data fetching is fail', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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

      const getState = vi.fn(() => initialState);
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

    it('should alert You must be login to vote a comment thread! when authUser is null', async () => {
      const initialState = {
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

      const getState = vi.fn(() => initialState);
      const dispatch = vi.fn();
      const spyAlert = vi.spyOn(window, 'alert');

      await asyncDownVoteDetailThreadComment({ threadId: 'thread-1', commentId: 'comment-1' })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(spyAlert).toHaveBeenCalledWith('You must be login to vote a comment thread!');
      expect(getState).toHaveBeenCalledTimes(1);
    });

    it('should neutralize detail thread comment down Vote when user already down vote the comment in the thread', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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
              downVotesBy: ['users-1'],
            },
          ],
        },
      };

      const getState = vi.fn(() => initialState);
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

    it('should alert error message and undo neutralize detail thread comment down Vote when data fetching failed', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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
              downVotesBy: ['users-1'],
            },
          ],
        },
      };

      const getState = vi.fn(() => initialState);
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

    it('should down vote detail thread comment', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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

      const getState = vi.fn(() => initialState);
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

    it('should down vote detail thread comment and neutralize up vote comment when user already up vote comment', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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
              upVotesBy: ['users-1'],
              downVotesBy: [],
            },
          ],
        },
      };

      const getState = vi.fn(() => initialState);
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

    it('should undo down vote detail thread comment when data fetching is fail', async () => {
      const initialState = {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
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

      const getState = vi.fn(() => initialState);
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
