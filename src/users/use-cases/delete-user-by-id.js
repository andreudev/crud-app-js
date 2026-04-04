import { localhostUserToModel } from "../mappers/localhost-user.mapper";

export const deleteUserById = async (id) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  const user = await response.json();
  return localhostUserToModel(user);
};
