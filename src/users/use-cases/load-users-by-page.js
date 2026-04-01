import { localhostUserToModel } from "../mappers/localhost-user.mapper";

export const loadUsersByPage = async (page = 1) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
  const response = await fetch(url);
  const { data, last } = await response.json();
  const lastPage = last;
  if (page > lastPage) return [];

  const users = data.map(localhostUserToModel);
  return users;
};
