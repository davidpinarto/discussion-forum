import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  describe, it, expect, afterEach, beforeEach,
} from 'vitest';
import { cleanup, render, act } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThreadList } from './ThreadList';

expect.extend(matchers);

describe('ThreadList component', () => {
  let mockedThreads = null;
  let mockedUsers = null;

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
  });
  afterEach(() => {
    cleanup();

    mockedThreads = null;
    mockedUsers = null;
  });

  it('renders threads correctly', async () => {
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

  it('renders filtered threads correctly', async () => {
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

  it('renders threads with correct links', async () => {
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

    threadListItem.forEach((threadItem, index) => {
      const threadLink = getByText(mockedThreads[index].title);
      expect(threadLink).toHaveAttribute('href', `/threads/${mockedThreads[index].id}`);
    });
  });
});
