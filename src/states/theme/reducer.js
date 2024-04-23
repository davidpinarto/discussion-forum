import { ActionType } from './action';

export function themeModeReducer(themeMode = 'light', action = {}) {
  switch (action.type) {
    case ActionType.SET_THEME_LIGHT_MODE:
      return action.payload.themeMode;
    case ActionType.SET_THEME_DARK_MODE:
      return action.payload.themeMode;
    default:
      return themeMode;
  }
}
