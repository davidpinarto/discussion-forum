export const ActionType = {
  SET_THREADS: 'SET_THREADS',
};

export function setThreadsActionCreator(threads) {
  return {
    type: ActionType.SET_THREADS,
    payload: {
      threads,
    },
  };
}
