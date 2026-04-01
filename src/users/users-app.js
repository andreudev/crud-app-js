import { RenderButton } from "./presentation/render-buttons/render-botton";
import { RenderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";

export const UsersApp = async (element) => {
  element.innerHTML = `Loading...`;
  await usersStore.loadNextPage();

  const users = usersStore.getUsers();
  console.log(users);
  RenderTable(element);
  RenderButton(element);
};
