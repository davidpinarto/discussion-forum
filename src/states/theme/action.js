export const ActionType = {
  SET_THEME_LIGHT_MODE: 'SET_THEME_LIGHT_MODE',
  SET_THEME_DARK_MODE: 'SET_THEME_DARK_MODE',
};

export function setThemeLightActionCreator(themeMode) {
  return {
    type: ActionType.SET_THEME_LIGHT_MODE,
    payload: {
      themeMode,
    },
  };
}

export function setThemeDarkActionCreator(themeMode) {
  return {
    type: ActionType.SET_THEME_DARK_MODE,
    payload: {
      themeMode,
    },
  };
}
