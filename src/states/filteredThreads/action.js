export const ActionType = {
  SET_FILTERED_THREADS: 'SET_FILTERED_THREADS',
  UNSET_FILTERED_THREADS: 'UNSET_FILTERED_THREADS',
};

export function setFilteredThreadsActionCreator(filteredThreads) {
  return {
    type: ActionType.SET_FILTERED_THREADS,
    payload: {
      filteredThreads,
    },
  };
}

export function unsetFilteredThreadsActionCreator() {
  return {
    type: ActionType.UNSET_FILTERED_THREADS,
    payload: {
      filteredThreads: null,
    },
  };
}
