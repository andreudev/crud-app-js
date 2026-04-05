import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
  currentPage: 0,
  users: [],
};

const loadNextPage = async () => {
  const users = await loadUsersByPage(state.currentPage + 1);
  if (users.length === 0) return;

  state.currentPage += 1;
  state.users = users;
};

const loadPreviousPage = async () => {
  if (state.currentPage === 1) return;

  const users = await loadUsersByPage(state.currentPage - 1);
  state.currentPage -= 1;
  state.users = users;
};

const onUserChanged = async (updatedUser) => {
  let wasFound = false;
  state.users = state.users.map((u) => {
    if (u.id === updatedUser.id) {
      wasFound = true;
      return updatedUser;
    }
    return u;
  });

  if (!wasFound && state.users.length < 10) {
    state.users.push(updatedUser);
  }
};

const reloadPage = async () => {
  const users = await loadUsersByPage(state.currentPage);
  if (users.length === 0) return;
  state.users = users;
};

export default {
  loadNextPage,
  loadPreviousPage,
  onUserChanged,
  reloadPage,

  getUsers: () => [...state.users],
  getCurrentPage: () => state.currentPage,
};
