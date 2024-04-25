import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { authUserReducer } from './authUser/reducer';
import { isPreloadReducer } from './isPreload/reducer';
import { threadsReducer } from './threads/reducer';
import { filteredThreadsReducer } from './filteredThreads/reducer';
import { detailThreadReducer } from './detailThread/reducer';
import { usersReducer } from './users/reducer';

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    filteredThreads: filteredThreadsReducer,
    detailThread: detailThreadReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
  },
});
