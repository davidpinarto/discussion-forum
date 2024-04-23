import { ActionType } from './action';

export function languageReducer(language = 'Indonesia', action = {}) {
  switch (action.type) {
    case ActionType.SET_LANGUAGE:
      return action.payload.language;
    default:
      return language;
  }
}
