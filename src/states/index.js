import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { authUserReducer } from './authUser/reducer';
import { isPreloadReducer } from './isPreload/reducer';
import { themeModeReducer } from './theme/reducer';
import { languageReducer } from './language/reducer';

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    themeMode: themeModeReducer,
    language: languageReducer,
    loadingBar: loadingBarReducer,
  },
});
