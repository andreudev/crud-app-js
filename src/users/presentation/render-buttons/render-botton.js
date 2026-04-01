import usersStore from "../../store/users-store";
import { RenderTable } from "../render-table/render-table";
import "./render-button.css";

export const RenderButton = (element) => {
  const nextButton = document.createElement("button");
  nextButton.innerText = "Next Page";
  nextButton.classList.add("button");

  const prevButton = document.createElement("button");
  prevButton.innerText = "Previous Page";
  prevButton.classList.add("button");

  const currentPage = document.createElement("span");
  currentPage.id = "current-page";
  currentPage.innerText = usersStore.getCurrentPage();

  element.append(prevButton, currentPage, nextButton);

  nextButton.addEventListener("click", async () => {
    await usersStore.loadNextPage();
    currentPage.innerText = usersStore.getCurrentPage();
    RenderTable(element);
  });

  prevButton.addEventListener("click", async () => {
    await usersStore.loadPreviousPage();
    currentPage.innerText = usersStore.getCurrentPage();
    RenderTable(element);
  });
};
