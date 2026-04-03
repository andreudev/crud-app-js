import { localhostUserToModel } from "../mappers/localhost-user.mapper";

export const getUserById = async (id) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
  const response = await fetch(url);
  const user = await response.json();
  return localhostUserToModel(user);
};
