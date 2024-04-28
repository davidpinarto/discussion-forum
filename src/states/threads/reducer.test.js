/**
 * - threadsReducer function
 *   - should return threads initial state when give by unknown action
 *   - should return the threads with given by SET_THREADS action
 *   - should return the threads with new thread when given by ADD_THREAD action
 *   - should return the threads with modified upVotesBy
 *     by added the userId in upVotesBy when action is TOGGLE_UP_VOTE_THREAD action
 *   - should return the threads with modified downVotesBy when action is
 *     by added the userId in downVotesBy when action is TOGGLE_DOWN_VOTE_THREAD action
 *   - should return the threads with modified upVotesBy
 *     by remove the userId in upVotesBy when action is NEUTRALIZE_THREAD_UPVOTE
 *   - should return the threads with modified downVotesBy
 *     by remove the userId in downVotesBy when action is NEUTRALIZE_THREAD_DOWN_VOTE
 */

import { describe, it, expect } from 'vitest';
import { threadsReducer } from './reducer';

describe('threadsReducer function', () => {
  it('should return threads initial state when give by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads with given by SET_THREADS action', () => {
    const initialState = [];
    const action = {
      type: 'SET_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with new thread when given by ADD_THREAD action', () => {
    const threadsState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'ADD_THREAD',
      payload: {
        newThread: {
          id: 'thread-3',
          title: 'Thread ketiga',
          body: 'Ini adalah thread ketiga',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-3',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    const nextState = threadsReducer(threadsState, action);

    expect(nextState).toEqual([action.payload.newThread, ...threadsState]);
  });

  it('should return the threads with modified upVotesBy by added the userId in upVotesBy when action is TOGGLE_UP_VOTE_THREAD action', () => {
    const threadsState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'TOGGLE_UP_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };

    const nextState = threadsReducer(threadsState, action);

    expect(nextState).toEqual([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['user-2'],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ]);
  });

  it('should return the threads with modified downVotesBy when action is by added the userId in downVotesBy when action is TOGGLE_DOWN_VOTE_THREAD action', () => {
    const threadsState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'TOGGLE_DOWN_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };

    const nextState = threadsReducer(threadsState, action);

    expect(nextState).toEqual([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['user-2'],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ]);
  });

  it('should return the threads with modified upVotesBy by remove the userId in upVotesBy when action is NEUTRALIZE_THREAD_UPVOTE', () => {
    const threadsState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['user-2'],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'NEUTRALIZE_THREAD_UPVOTE',
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };

    const nextState = threadsReducer(threadsState, action);

    expect(nextState).toEqual([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ]);
  });

  it('should return the threads with modified downVotesBy by remove the userId in downVotesBy when action is NEUTRALIZE_THREAD_DOWN_VOTE', () => {
    const threadsState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['user-2'],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'NEUTRALIZE_THREAD_DOWN_VOTE',
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };

    const nextState = threadsReducer(threadsState, action);

    expect(nextState).toEqual([
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ]);
  });
});
