/**
 * - authUserReducers function
 *   - should return authUser initial state when give by unknown action
 *   - should return the authUser when given by SET_AUTH_USER action
 *   - should return null when action is UNSET_AUTH_USER action
 */

import { describe, it, expect } from 'vitest';
import { authUserReducer } from './reducer';

describe('authUserReducer function', () => {
  it('should return authUser initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return authUser object when the action is SET_AUTH_USER', () => {
    const initialState = [];
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null when the action is UNSET_AUTH_USER', () => {
    const initialState = [];
    const action = { type: 'UNSET_AUTH_USER' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(null);
  });
});
