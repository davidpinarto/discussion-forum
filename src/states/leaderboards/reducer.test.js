/**
 * - leaderboardsReducers function
 *   - should return leaderboards initial state when give by unknown action
 *   - should return the leaderboards when given by SET_LEADERBOARDS action
 */

import { describe, it, expect } from 'vitest';
import { leaderboardsReducer } from './reducer';

describe('leaderboardsReducer function', () => {
  it('should return leaderboards initial state when give by unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboards when given by SET_LEADERBOARDS action', () => {
    const initialState = [];
    const action = {
      type: 'SET_LEADERBOARDS',
      payload: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
          {
            user: {
              id: 'users-2',
              name: 'Jane Doe',
              email: 'jane@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 5,
          },
        ],
      },
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
