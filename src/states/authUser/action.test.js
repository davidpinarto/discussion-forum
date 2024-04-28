/**
 * - asyncSetAuthUser thunk
 *   - should dispatch action correctly when data fetching is success
 *   - should dispatch action correctly and call alert correctly when data fetching failed
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  setAuthUserActionCreator,
  asyncSetAuthUser,
  unsetAuthUserActionCreator,
  asyncUnsetAuthUser,
} from './action';

const fakeUserResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeLoginResponse = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw';

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('authUser thunks', () => {
  describe('asyncSetAuthUser thunk', () => {
    beforeEach(() => {
      api._getOwnProfile = api.getOwnProfile;
      api._login = api.login;
    });

    afterEach(() => {
      api.getOwnProfile = api._getOwnProfile;
      api.login = api._login;

      delete api._getOwnProfile;
      delete api._login;
    });

    it('should dispatch action correctly when data fetching success', async () => {
      api.login = () => Promise.resolve(fakeLoginResponse);
      api.getOwnProfile = () => Promise.resolve(fakeUserResponse);

      const dispatch = vi.fn();

      await asyncSetAuthUser({ email: 'fakeEmail', password: 'fakePassword' })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserResponse));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
      api.login = () => Promise.reject(fakeErrorResponse);
      api.getOwnProfile = () => Promise.resolve(fakeErrorResponse);

      const dispatch = vi.fn();
      window.alert = vi.fn();

      await asyncSetAuthUser({ email: 'fakeEmail', password: 'fakePassword' })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });

  describe('asyncUnsetAuthUser thunk', () => {
    beforeEach(() => {
      api._putAccessToken = api.putAccessToken;
    });

    afterEach(() => {
      api.putAccessToken = api._putAccessToken;

      delete api._putAccessToken;
    });

    it('should dispatch action correctly when data fetching success', () => {
      api.putAccessToken = () => Promise.resolve();

      const dispatch = vi.fn();

      asyncUnsetAuthUser()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
