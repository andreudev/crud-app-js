import { User } from "../models/user";

/** * Transforms a user object from the localhost API format to the User model format.
 *
 * @param {Object} localhostUser - The user object in the format returned by the localhost API.
 * @returns {User} A new User instance with properties mapped from the localhost user object.
 */
export const localhostUserToModel = (localhostUser) => {
  const { avatar, balance, first_name, gender, id, isActive, last_name } = localhostUser;
  return new User({
    avatar,
    balance,
    firstName: first_name,
    gender,
    id,
    isActive,
    lastName: last_name,
  });
};
