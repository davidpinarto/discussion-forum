export const ActionType = {
//   SET_INDONESIA_LANGUAGE: 'SET_INDONESIA_LANGUAGE',
//   SET_ENGLISH_LANGUAGE: 'SET_ENGLISH_LANGUAGE',
  SET_LANGUAGE: 'SET_LANGUAGE',
};

// export function setThemeLightActionCreator(language) {
//   return {
//     type: ActionType.SET_INDONESIA_LANGUAGE,
//     payload: {
//       language,
//     },
//   };
// }

// export function setThemeDarkActionCreator(language) {
//   return {
//     type: ActionType.SET_ENGLISH_LANGUAGE,
//     payload: {
//       language,
//     },
//   };
// }

export function setLanguage(language) {
  return {
    type: ActionType.SET_LANGUAGE,
    payload: {
      language,
    },
  };
}
