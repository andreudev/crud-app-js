import { userModelToLocalhost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";
import { localhostUserToModel } from "../mappers/localhost-user.mapper";

export const saveUser = async (userLike) => {
  const user = new User(userLike);
  if (!user.firstName || !user.lastName) {
    throw new Error("First name and last name are required");
  }
  const userToSave = userModelToLocalhost(user);
  let userUpdated;
  if (user.id) {
    userUpdated = await updateUser(userToSave);
  } else {
    userUpdated = await createUser(userToSave);
  }
  // Map the API response to the User model
  return localhostUserToModel(userUpdated);
};

const updateUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const updatedUser = await response.json();

  return updatedUser;
};

const createUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const newUser = await response.json();
  console.log(newUser);
  return newUser;
};
