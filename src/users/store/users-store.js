const state = {
  currentPage: 0,
  users: [],
};

const loadNextPage = async () => {};

const loadPreviousPage = async () => {};

const onUserChanged = async () => {};

const reloadPage = async () => {};

export default {
  loadNextPage,
  loadPreviousPage,
  onUserChanged,
  reloadPage,

  getUsers: () => [...state.users],
  getCurrentPage: () => state.currentPage,
};
