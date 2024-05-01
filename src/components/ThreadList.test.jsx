/**
 * - ThreadList React Testing Library
 *   - should renders threads correctly
 *   - should renders filtered threads correctly
 *   - should add the up vote when user click the up vote button
 *   - should add the down vote when user click the down vote button
 *   - should should navigate to the /threads/:id link when the title is clicked
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  describe, it, expect, afterEach, beforeEach,
} from 'vitest';
import {
  cleanup, render, act, fireEvent,
} from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThreadList } from './ThreadList';

expect.extend(matchers);

describe('ThreadList component', () => {
  let mockedThreads = null;
  let mockedUsers = null;
  let mockedAuthUser = null;

  beforeEach(() => {
    mockedThreads = [
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
        category: 'Belajar',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    mockedUsers = [
      {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'users-2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'users-3',
        name: 'Si Fulan',
        email: 'fulan@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ];
    mockedAuthUser = {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
  });
  afterEach(() => {
    cleanup();

    mockedThreads = null;
    mockedUsers = null;
    mockedAuthUser = null;
  });

  it('should renders threads correctly', async () => {
    const mockThreadsReducer = (threads = mockedThreads) => threads;
    const mockUsersReducer = (users = mockedUsers) => users;
    const mockStores = configureStore({
      reducer: {
        threads: mockThreadsReducer,
        users: mockUsersReducer,
      },
    });

    const { getByText, container } = await act(async () => render(
      <BrowserRouter>
        <Provider store={mockStores}>
          <ThreadList />
        </Provider>
      </BrowserRouter>,
    ));

    const threadListItem = container.querySelectorAll('.thread-list > li');

    expect(getByText('Thread Pertama')).toBeInTheDocument();
    expect(getByText('Thread Kedua')).toBeInTheDocument();
    expect(threadListItem.length).toBe(2);
  });

  it('should renders filtered threads correctly', async () => {
    const mockFilteredThreads = [
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'Belajar',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const mockThreadsReducer = (threads = mockedThreads) => threads;
    const mockUsersReducer = (users = mockedUsers) => users;
    const mockStores = configureStore({
      reducer: {
        threads: mockThreadsReducer,
        users: mockUsersReducer,
      },
    });

    const { getByText, container } = await act(async () => render(
      <BrowserRouter>
        <Provider store={mockStores}>
          <ThreadList filteredThreads={mockFilteredThreads} />
        </Provider>
      </BrowserRouter>,
    ));

    const threadListItem = container.querySelectorAll('.thread-list > li');

    expect(getByText('Thread Kedua')).toBeInTheDocument();
    expect(threadListItem.length).toBe(1);
  });

  it('should add the up vote when user click the up vote button', async () => {
    const mockThreadsReducer = (threads = mockedThreads, action = {}) => {
      switch (action.type) {
        case 'TOGGLE_UP_VOTE_THREAD':
          return threads.map((thread) => {
            if (thread.id === action.payload.threadId) {
              return {
                ...thread,
                upVotesBy: thread.upVotesBy.concat([action.payload.userId]),
              };
            }
            return thread;
          });
        default:
          return threads;
      }
    };
    const mockUsersReducer = (users = mockedUsers) => users;
    const mockAuthUserReducer = (authUser = mockedAuthUser) => authUser;
    const mockStores = configureStore({
      reducer: {
        threads: mockThreadsReducer,
        users: mockUsersReducer,
        authUser: mockAuthUserReducer,
      },
    });

    const { container } = await act(async () => render(
      <BrowserRouter>
        <Provider store={mockStores}>
          <ThreadList />
        </Provider>
      </BrowserRouter>,
    ));

    const threadUpVotesButtonList = container.querySelectorAll('.likes');
    const threadUpVotesCountList = container.querySelectorAll('.likes > p');

    threadUpVotesButtonList.forEach(async (threadItem) => {
      fireEvent.click(threadItem);
    });

    threadUpVotesCountList.forEach((threadItemCount) => {
      expect(threadItemCount.textContent).toEqual('1');
    });
  });

  it('should add the down vote when user click the down vote button', async () => {
    const mockThreadsReducer = (threads = mockedThreads, action = {}) => {
      switch (action.type) {
        case 'TOGGLE_DOWN_VOTE_THREAD':
          return threads.map((thread) => {
            if (thread.id === action.payload.threadId) {
              return {
                ...thread,
                downVotesBy: thread.downVotesBy.concat([action.payload.userId]),
              };
            }
            return thread;
          });
        default:
          return threads;
      }
    };
    const mockUsersReducer = (users = mockedUsers) => users;
    const mockAuthUserReducer = (authUser = mockedAuthUser) => authUser;
    const mockStores = configureStore({
      reducer: {
        threads: mockThreadsReducer,
        users: mockUsersReducer,
        authUser: mockAuthUserReducer,
      },
    });

    const { container } = await act(async () => render(
      <BrowserRouter>
        <Provider store={mockStores}>
          <ThreadList />
        </Provider>
      </BrowserRouter>,
    ));

    const threadDownVotesButtonList = container.querySelectorAll('.dislikes');
    const threadDownVotesCountList = container.querySelectorAll('.dislikes > p');

    threadDownVotesButtonList.forEach(async (threadItem) => {
      fireEvent.click(threadItem);
    });

    threadDownVotesCountList.forEach((threadItemCount) => {
      expect(threadItemCount.textContent).toEqual('1');
    });
  });

  it('should should navigate to the /threads/:id link when the title is clicked', async () => {
    const mockThreadsReducer = (threads = mockedThreads) => threads;
    const mockUsersReducer = (users = mockedUsers) => users;
    const mockStores = configureStore({
      reducer: {
        threads: mockThreadsReducer,
        users: mockUsersReducer,
      },
    });

    const { getByText, container } = await act(async () => render(
      <BrowserRouter>
        <Provider store={mockStores}>
          <ThreadList />
        </Provider>
      </BrowserRouter>,
    ));

    const threadListItemLink = container.querySelectorAll('.thread-list > li > h2 > a');

    threadListItemLink.forEach((threadItemLink, index) => {
      const threadLink = getByText(mockedThreads[index].title);

      fireEvent.click(threadLink);

      expect(window.location.pathname).toBe(`/threads/${mockedThreads[index].id}`);
    });
  });
});
