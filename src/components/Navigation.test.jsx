/**
 * - Navigation React Testing Library
 *   - should render navigation correctly when user not logged
 *   - should render navigation correctly when user is logged
 *   - should navigate to / when user click Home button
 *   - should navigate to /leaderboards when user click Leaderboards button
 *   - should call onSignOut function when user click Logout button
 *   - should navigate to /login when user click Login button
 *   - should not render profile-info when window location is on /register
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
import { Navigation } from './Navigation';

expect.extend(matchers);

describe('Navigation component', () => {
  let mockedauthUser = null;
  let originalPathname;

  beforeEach(() => {
    mockedauthUser = {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    originalPathname = window.location.pathname;
  });

  afterEach(() => {
    cleanup();

    mockedauthUser = null;
    window.history.replaceState({}, '', originalPathname);
  });

  it('should render navigation correctly when user not logged', async () => {
    const mockAuthUserReducer = (authUser = null) => authUser;
    const mockStores = configureStore({
      reducer: {
        authUser: mockAuthUserReducer,
      },
    });
    const { getByText, container } = await act(async () => render(
      <BrowserRouter>
        <Provider store={mockStores}>
          <Navigation />
        </Provider>
      </BrowserRouter>,
    ));

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Leaderboards')).toBeInTheDocument();
    expect(container.querySelector('.profile-info > img'))
      .toHaveAttribute('src', 'https://ui-avatars.com/api/?name=Guest&background=80CBDC');
    expect(getByText('Guest')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('should render navigation correctly when user is logged', async () => {
    const mockAuthUserReducer = (authUser = mockedauthUser) => authUser;
    const mockStores = configureStore({
      reducer: {
        authUser: mockAuthUserReducer,
      },
    });
    const { getByText, container } = await act(async () => render(
      <BrowserRouter>
        <Provider store={mockStores}>
          <Navigation />
        </Provider>
      </BrowserRouter>,
    ));

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Leaderboards')).toBeInTheDocument();
    expect(container.querySelector('.profile-info > img'))
      .toHaveAttribute('src', 'https://generated-image-url.jpg');
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('should navigate to / when user click Home button', async () => {
    const mockAuthUserReducer = (authUser = mockedauthUser) => authUser;
    const mockStores = configureStore({
      reducer: {
        authUser: mockAuthUserReducer,
      },
    });
    const { getByText } = await act(async () => render(
      <BrowserRouter>
        <Provider store={mockStores}>
          <Navigation />
        </Provider>
      </BrowserRouter>,
    ));

    const homeButton = getByText('Home');

    fireEvent.click(homeButton);

    expect(window.location.pathname).toBe('/');
  });

  it('should navigate to /leaderboards when user click Leaderboards button', async () => {
    const mockAuthUserReducer = (authUser = mockedauthUser) => authUser;
    const mockStores = configureStore({
      reducer: {
        authUser: mockAuthUserReducer,
      },
    });
    const { getByText } = await act(async () => render(
      <BrowserRouter>
        <Provider store={mockStores}>
          <Navigation />
        </Provider>
      </BrowserRouter>,
    ));

    const leaderboardsButton = getByText('Leaderboards');

    fireEvent.click(leaderboardsButton);

    expect(window.location.pathname).toBe('/leaderboards');
  });

  it('should call onSignOut function when user click Logout button', async () => {
    const mockAuthUserReducer = (authUser = mockedauthUser, action) => {
      switch (action.type) {
        case 'UNSET_AUTH_USER':
          return null;
        default:
          return authUser;
      }
    };
    const mockStores = configureStore({
      reducer: {
        authUser: mockAuthUserReducer,
      },
    });

    const { getByText } = await act(async () => render(
      <BrowserRouter>
        <Provider store={mockStores}>
          <Navigation />
        </Provider>
      </BrowserRouter>,
    ));

    const logoutButton = getByText('Logout');

    fireEvent.click(logoutButton);

    expect(getByText('Guest')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('should navigate to /login when user click Login button', async () => {
    const mockAuthUserReducer = (authUser = null) => authUser;
    const mockStores = configureStore({
      reducer: {
        authUser: mockAuthUserReducer,
      },
    });
    const { getByText } = await act(async () => render(
      <BrowserRouter>
        <Provider store={mockStores}>
          <Navigation />
        </Provider>
      </BrowserRouter>,
    ));

    const loginButton = getByText('Login');

    fireEvent.click(loginButton);

    expect(window.location.pathname).toBe('/login');
  });

  it('should not render profile-info when window location is on /login', async () => {
    const mockAuthUserReducer = (authUser = null) => authUser;
    const mockStores = configureStore({
      reducer: {
        authUser: mockAuthUserReducer,
      },
    });
    const { getByText, container } = await act(async () => render(
      <BrowserRouter>
        <Provider store={mockStores}>
          <Navigation />
        </Provider>
      </BrowserRouter>,
    ));

    const loginButton = getByText('Login');

    fireEvent.click(loginButton);

    expect(window.location.pathname).toBe('/login');
    expect(container.querySelector('.profile-info')).not.toBeInTheDocument();
  });

  it('should not render profile-info when window location is on /register', async () => {
    const mockAuthUserReducer = (authUser = null) => authUser;
    const mockStores = configureStore({
      reducer: {
        authUser: mockAuthUserReducer,
      },
    });
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...originalPathname, pathname: '/register' },
    });

    const { container } = await act(async () => render(
      <BrowserRouter>
        <Provider store={mockStores}>
          <Navigation />
        </Provider>
      </BrowserRouter>,
    ));

    expect(window.location.pathname).toBe('/register');
    expect(container.querySelector('.profile-info')).not.toBeInTheDocument();
  });
});
