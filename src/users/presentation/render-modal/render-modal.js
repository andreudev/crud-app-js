import { getUserById } from "../../use-cases/get-user-by-id";
import "./render-modal.css";
import modalHtml from "./render-modal.html?raw";

let modal,
  form,
  loadedUser = {};

export const showModal = async (id) => {
  if (!modal) return;
  modal.classList.remove("hidden");
  if (!id) {
    form?.reset();
    return;
  }
  loadedUser = {};
  const user = await getUserById(id);
  setFormValues(user);
};

export const hideModal = () => {
  if (!modal) return;
  modal.classList.add("hidden");
  form?.reset();
};

const setFormValues = (user) => {
  if (!form) return;
  form.firstName.value = user.firstName;
  form.lastName.value = user.lastName;
  form.balance.value = user.balance;
  form.isActive.checked = user.isActive;
  loadedUser = user;
};

export const RenderModal = (element, callback) => {
  if (modal) return;

  modal = document.createElement("div");
  modal.innerHTML = modalHtml;
  modal.className = "modal-container hidden";
  form = modal.querySelector("form");
  element.append(modal);

  modal.addEventListener("click", (event) => {
    if (event.target.className !== "modal-container") return;
    hideModal();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const userLike = { ...loadedUser };
    // Set all values from form
    for (const [key, value] of formData) {
      if (key === "balance") {
        userLike[key] = parseFloat(value);
        continue;
      }
      if (key !== "isActive") {
        userLike[key] = value;
      }
    }

    userLike.isActive = form.isActive.checked;
    await callback(userLike);
    hideModal();
  });
};
