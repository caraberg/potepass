/* Ewa Cwik*/

import "./users.css";
import { getUsers, updateUser, deleteUser } from "../../api/usersApi";

export type User = {
  id: number;
  userName: string;
  surname?: string;
  password: string;
  email: string;
  image?: string;
  dogs: {
    id: number;
    name: string;
    breed: string;
    age: number;
    weight?: number;
  }[];
  created: string;
  updated: string;
};

type Dog = {
  id: number;
  name: string;
  breed: string;
  age: number;
  weight?: number;
};

export function renderProfile(container: HTMLElement) {
  container!.innerHTML = `
  <section class="main-container">
        <div class="user-container">
          <div class="user-picture">
            <label for="uploadImage" class="user-picture">
              <span class="upload-text">Legg til et bilde</span>
              <img id="previewImage" src="" alt="" />
            </label>
          </div>

          <input type="file" id="uploadImage" accept="image/*" hidden />

          <button type="button" class="addDogBtn">Legg til en hund</button>

          <div class="dog-container">
            <div class="addDog-modal-overlay hidden" id="addDog-modal-overlay">
              <div class="modal-user">
                <h2>Hundens profil</h2>
                <div class="dog-picture">
                  <label for="dogUploadImage" class="dog-picture">
                    <span class="upload-text">Legg til et bilde</span>
                    <img id="dogPreviewImage" src="" alt=""/>
                  </label>
                  <input type="file" id="dogUploadImage" accept="image/*" hidden />
                </div>

                <div class="editDogForm">
                  <label for="modal-dogName"></label>
                  <input id="modal-dogName" type="text" placeholder="Navn" />

                    <label for="modal-breed"></label>
                  <input id="modal-breed" type="text" placeholder="Avle" />

                  <label for="modal-age"></label>
                  <input id="modal-age" type="number" placeholder="Alder" />

                  <label for="modal-weight"></label>
                  <input id="modal-weight" type="number" placeholder="Vekt" />

                  <div class="modal-userbuttons">
                    <button class="modal-saveBtn" id="save-modal-btn">
                      Lagre
                    </button>
                    <button class="modal-cancelBtn" id="close-modal-btn">
                      Slett
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2>Din profil</h2>
        <div class="form">
          <div class="editUserForm">
            <label for="edit-email-txt"></label>
            <input
              type="email"
              id="edit-email-txt"
              placeholder="E-post"
              required
            />

            <label for="edit-userName-txt"></label>
            <input type="text" id="edit-userName-txt" placeholder="Navn" required />

            <label for="edit-surname-txt"></label>
            <input
              type="text"
              id="edit-surname-txt"
              placeholder="Etternavn"
              required
            />

            <label for="edit-password-txt"></label>
            <input
              type="password"
              id="edit-password-txt"
              placeholder="Passord"
              required
            />
            <div class="button-group">
              <button type="submit" class="saveBtn">Lagre</button>
              <button type="button" class="deleteBtn">Slett konto</button>
            </div>
          </div>
        </div>
      </section>
                  `;
  initUsers();
}

function initUsers() {
  const userNameInput = document.getElementById(
    "edit-userName-txt",
  ) as HTMLInputElement;
  const surnameInput = document.getElementById(
    "edit-surname-txt",
  ) as HTMLInputElement;
  const passwordInput = document.getElementById(
    "edit-password-txt",
  ) as HTMLInputElement;
  const emailInput = document.getElementById(
    "edit-email-txt",
  ) as HTMLInputElement;

  const dogNameInput = document.getElementById(
    "modal-dogName",
  ) as HTMLInputElement;
  const breedInput = document.getElementById("modal-breed") as HTMLInputElement;
  const ageInput = document.getElementById("modal-age") as HTMLInputElement;
  const weightInput = document.getElementById(
    "modal-weight",
  ) as HTMLInputElement;

  const saveBtn = document.querySelector(".saveBtn") as HTMLButtonElement;
  const deleteBtn = document.querySelector(".deleteBtn") as HTMLButtonElement;

  /*test*/
  const userId = 1;

  async function loadUser() {
  try {
    const users = await getUsers();
    const user = users.find((user) => user.id === userId);

    if (!user) {
      throw new Error("Fant ikke bruker");
    }

    userNameInput.value = user.userName;
    surnameInput.value = user.surname || "";
    passwordInput.value = user.password;
    emailInput.value = user.email;

    if (user.dogs.length > 0) {
      dogNameInput.value = user.dogs[0].name;
      breedInput.value = user.dogs[0].breed;
      ageInput.value = user.dogs[0].age.toString();
      weightInput.value = user.dogs[0].weight?.toString() || "";
    }
  } catch (error) {
    alert("Kunne ikke hente bruker");
  }
}

  loadUser();

  saveBtn.addEventListener("click", async () => {
    const updatedUser = {
      id: userId,
      email: emailInput.value,
      userName: userNameInput.value,
      surname: surnameInput.value,
      password: passwordInput.value,
      image: "",
      dogs: [],
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
  const closeBtn = document.getElementById(
    "close-modal-btn",
  ) as HTMLButtonElement;
  const saveModalBtn = document.getElementById(
    "save-modal-btn",
  ) as HTMLButtonElement;
  const modalOverlay = document.getElementById(
    "addDog-modal-overlay",
  ) as HTMLDivElement;

  addDogBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    modalOverlay.classList.add("hidden");
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.add("hidden");
    }
  });

  const dogsList = document.createElement("div");
  dogsList.classList.add("dogs-list");
  document.querySelector(".user-container")?.append(dogsList);

  let dogs: Dog[] = [];
  let dogIdCounter = 1;

  saveModalBtn.addEventListener("click", () => {
    const name = dogNameInput.value.trim();
    const breed = breedInput.value.trim();
    const age = Number(ageInput.value);
    const weight = Number(weightInput.value);

    if (!name) {
      alert("Skriv inn navn!");
      return;
    }
    const newDog: Dog = {
      id: dogIdCounter++,
      name: name,
      breed,
      age,
      weight,
    };

    dogs.push(newDog);
    showDogs();

    const overlay = document.querySelector<HTMLElement>("#addDog-modal-overlay");
    overlay?.classList.add("hidden");

    dogNameInput.value = "";
    breedInput.value = "";
    ageInput.value = "";
    weightInput.value = "";
  });

  function showDogs() {
    dogsList.innerHTML = "";

    dogs.forEach((dog) => {
      const dogDiv = document.createElement("div");
      dogDiv.classList.add("dog-card");
      dogDiv.innerHTML = `
      <h3>${dog.name}</h3>
      <p>Avle: ${dog.breed}</p>
      <p>Alder: ${dog.age}</p>
      <p>Vekt: ${dog.weight}</p>
      <button class="delete-dog-btn">Slett</button>
    `;

      const deleteBtn = dogDiv.querySelector(
        ".delete-dog-btn",
      ) as HTMLButtonElement;
      deleteBtn.addEventListener("click", () => {
        dogs = dogs.filter((d) => d.id !== dog.id);
        showDogs();
      });

      dogsList.append(dogDiv);
    });
  }
}

/*bruker bilde*/
const uploadInput = document.getElementById("uploadImage") as HTMLInputElement;
const previewImage = document.getElementById(
  "previewImage",
) as HTMLImageElement;
const uploadText = document.querySelector(".upload-text") as HTMLSpanElement;

if (uploadInput && previewImage && uploadText) {
  uploadInput.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;

    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        previewImage.src = reader.result;
        previewImage.style.display = "block";
        uploadText.style.display = "none";
      }
    };

    reader.readAsDataURL(file);
  });
}

/*hund bilde*/
const dogUploadInput = document.getElementById(
  "dogUploadImage",
) as HTMLInputElement;
const dogPreviewImage = document.getElementById(
  "dogPreviewImage",
) as HTMLImageElement;
const dogUploadText = document.querySelector(
  ".dog-picture .upload-text",
) as HTMLSpanElement;

if (dogUploadInput && dogPreviewImage && dogUploadText) {
  dogUploadInput.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;

    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        dogPreviewImage.src = reader.result;
        dogPreviewImage.style.display = "block";
        dogUploadText.style.display = "none";
      }
    };

    reader.readAsDataURL(file);
  });
}