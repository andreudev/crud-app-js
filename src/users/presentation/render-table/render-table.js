import usersStore from "../../store/users-store";
import { deleteUserById } from "../../use-cases/delete-user-by-id";
import { showModal } from "../render-modal/render-modal";
import "./render-table.css";

let table;

const createTable = () => {
  const table = document.createElement("table");
  const tableHeaders = document.createElement("thead");

  tableHeaders.innerHTML = `
    <tr>
        <th>ID</th>
        <th>Balance</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Active</th>
        <th>Actions</th>
    </tr>
  `;

  const tableBody = document.createElement("tbody");

  table.append(tableHeaders, tableBody);
  return table;
};

const tableSelectListener = (event) => {
  const element = event.target.closest(".select-user");
  if (!element) return;
  const id = element.getAttribute("data-id");
  showModal(id);
};

const tableDeleteListener = async (event) => {
  const element = event.target.closest(".delete-user");
  if (!element) return;
  const id = element.getAttribute("data-id");
  try {
    await deleteUserById(id);
    await usersStore.reloadPage();
    document.querySelector("#current-page").textContent = usersStore.getCurrentPage();
    RenderTable();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export const RenderTable = (element) => {
  const users = usersStore.getUsers();
  if (!table) {
    table = createTable();
    element.append(table);

    table.addEventListener("click", (event) => {
      tableSelectListener(event);
    });
    table.addEventListener("click", (event) => {
      tableDeleteListener(event);
    });
  }

  let tableHtml = "";
  users.forEach((user) => {
    tableHtml += `
        <tr>
            <td>${user.id}</td>
            <td>${user.balance}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.isActive ? "Yes" : "No"}</td>
            <td><button data-id="${user.id}" class="select-user">Select</button> <button data-id="${user.id}" class="delete-user">Delete</button> </td>
        </tr>
        `;
  });

  table.querySelector("tbody").innerHTML = tableHtml;
};
