export const ActionType = {
  SET_LANGUAGE: 'SET_LANGUAGE',
};

export function setLanguage(language) {
  return {
    type: ActionType.SET_LANGUAGE,
    payload: {
      language,
    },
  };
}
