/**
 * - isPreloadReducers function
 *   - should return isPreload initial state when give by unknown action
 *   - should return the isPreload when given by SET_DETAIL_THREAD action
 */

import { describe, it, expect } from 'vitest';
import { isPreloadReducer } from './reducer';

describe('isPreloadReducer function', () => {
  it('should return isPreload initial state when give by unknown action', () => {
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the isPreload when given by SET_IS_PRELOAD action', () => {
    const initialState = [];
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: {
        isPreload: false,
      },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(action.payload.isPreload);
  });
});
