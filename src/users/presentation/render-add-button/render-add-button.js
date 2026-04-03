import { showModal } from "../render-modal/render-modal";
import "./render-add-button.css";

export const RenderAddButton = (element) => {
  const addButton = document.createElement("button");
  addButton.innerText = "+";
  addButton.classList.add("add-button");
  element.append(addButton);

  addButton.addEventListener("click", () => {
    showModal();
  });
};
