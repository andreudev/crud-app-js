import { RenderAddButton } from "./presentation/render-add-button/render-add-button";
import { RenderButton } from "./presentation/render-buttons/render-botton";
import { RenderModal } from "./presentation/render-modal/render-modal";
import { RenderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";
import { saveUser } from "./use-cases/save-user";

export const UsersApp = async (element) => {
  element.innerHTML = `Loading...`;
  await usersStore.loadNextPage();

  const users = usersStore.getUsers();
  console.log(users);
  RenderTable(element);
  RenderButton(element);
  RenderAddButton(element);
  RenderModal(element, async (userLike) => {
    const user = await saveUser(userLike);
    usersStore.onUserChanged(user);
    RenderTable(element);
  });
};
