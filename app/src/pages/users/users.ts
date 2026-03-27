/* Ewa Cwik*/

import "./users.css";
import { getUser, updateUser, deleteUser } from "../../api/usersApi";

const emailInput = document.getElementById(
  "edit-email-txt",
) as HTMLInputElement;
const nameInput = document.getElementById("edit-name-txt") as HTMLInputElement;
const surnameInput = document.getElementById(
  "edit-surname-txt",
) as HTMLInputElement;
const passwordInput = document.getElementById(
  "edit-password-txt",
) as HTMLInputElement;

const saveBtn = document.querySelector(".saveBtn") as HTMLButtonElement;
const deleteBtn = document.querySelector(".deleteBtn") as HTMLButtonElement;

/*test*/
const userId = 1;

async function loadUser() {
  try {
    const user = await getUser(userId);

    emailInput.value = user.email;
    nameInput.value = user.name;
    surnameInput.value = user.surname;
    passwordInput.value = user.password;
  } catch (error) {
    alert("Kunne ikke hente bruker");
  }
}

loadUser();

saveBtn.addEventListener("click", async () => {
  const updatedUser = {
    email: emailInput.value,
    name: nameInput.value,
    surname: surnameInput.value,
    password: passwordInput.value,
    image: "",
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  };

  try {
    await updateUser(userId, updatedUser);
    alert("Profil lagret!");
  } catch (error) {
    alert("Feil ved lagring");
  }
});

deleteBtn.addEventListener("click", async () => {
  const confirmDelete = confirm("Er du sikker på at du vil slette bruker?");

  if (!confirmDelete) return;

  try {
    await deleteUser(userId);
    alert("Konto er slettet!");
  } catch (error) {
    alert("Feil");
  }
});

const addDogBtn = document.querySelector(".addDogBtn") as HTMLButtonElement;
const modal = document.getElementById("addDog-modal-overlay") as HTMLDivElement;
const closeBtn = document.getElementById("close-modal-btn") as HTMLButtonElement;


addDogBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
  
});


/* DOG - mangler dogs api - kommer kanskje snart :P

type Dog = {
  id: number;
  name: string;
  age: number;
  weight: number;
};

const addDogBtn = document.querySelector(".addDogBtn") as HTMLButtonElement;
const modalOverlay = document.getElementById("addDog-modal-overlay") as HTMLDivElement;
const closeModalBtn = document.getElementById("close-modal-btn") as HTMLButtonElement;
const saveModalBtn = document.getElementById("save-modal-btn") as HTMLButtonElement;
const dogNameInput = document.getElementById("modal-name") as HTMLInputElement;
const dogAgeInput = document.getElementById("modal-age") as HTMLInputElement;
const dogWeightInput = document.getElementById("modal-weight") as HTMLInputElement;

const dogsList = document.createElement("div");
dogsList.classList.add("dogs-list");
document.querySelector(".user-container")?.append(dogsList);

let dogs: Dog[] = [];
let dogIdCounter = 1;

addDogBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modalOverlay.classList.add("hidden");
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.add("hidden");
});

saveModalBtn.addEventListener("click", () => {
  const name = dogNameInput.value.trim();
  const age = Number(dogAgeInput.value);
  const weight = Number(dogWeightInput.value);

  if (!name) {
    alert("Skriv inn navn!");
    return;
  }

  const newDog: Dog = {
    id: dogIdCounter++,
    name,
    age,
    weight,
  };

  dogs.push(newDog);
  showDogs();
  modalOverlay.classList.add("hidden");

  dogNameInput.value = "";
  dogAgeInput.value = "";
  dogWeightInput.value = "";
});

function showDogs() {
  dogsList.innerHTML = "";

  dogs.forEach((dog) => {
    const dogDiv = document.createElement("div");
    dogDiv.classList.add("dog-card");
    dogDiv.innerHTML = `
      <h3>${dog.name}</h3>
      <p>Alder: ${dog.age}</p>
      <p>Vekt: ${dog.weight}</p>
      <button class="delete-dog-btn">Slett</button>
    `;

    const deleteBtn = dogDiv.querySelector(".delete-dog-btn") as HTMLButtonElement;
    deleteBtn.addEventListener("click", () => {
      dogs = dogs.filter((d) => d.id !== dog.id);
      showDogs();
    });

    dogsList.append(dogDiv);
  });
}
*/

/*bruker bilde - ikke klar - kommer snart

const uploadInput = document.getElementById("uploadImage");
const previewImage = document.getElementById("previewImage");
const uploadText = document.querySelector(".upload-text");

uploadInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      previewImage.setAttribute("src", this.result);
      previewImage.style.display = "block";
      uploadText.style.display = "none";
    });

    reader.readAsDataURL(file);
  }
});
*/
