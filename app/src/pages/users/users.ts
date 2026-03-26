import "./users.css";

import {
  getUser,
  createUser, /*legg til en hund istedenfor */
  updateUser,
  deleteUser,
} from "../../api/usersApi";

type UserInput = {
  email: string;
  name: string;
  surname: string;
  password: string;
  image: string;
  created: string;
  updated: string;
};


export function renderUserEditForm(user: any): string {
  return `
    <section class="user-edit">

      <h2>Rediger profil</h2>

      <label>E-post</label>
      <input id="edit-email" type="email" value="${user.email}" />

      <label>Navn</label>
      <input id="edit-name" type="text" value="${user.name}" />

      <label>Etternavn</label>
      <input id="edit-surname" type="text" value="${user.surname}" />

      <label>Passord</label>
      <input id="edit-password" type="password" value="${user.password}" />

      <div style="margin-top:10px;">
        <button id="save-profile-btn">Lagre</button>
        <button id="delete-profile-btn" style="margin-left:10px; background:red; color:white;">Slett bruker</button>
      </div>
    </section>
  `;
}

async function init() {
  const view = document.querySelector("#view");
  if (!view) return;

  const user = await getUser(1);

  view.innerHTML = renderUserEditForm(user);
  setupUserEvents(user);
}

init();

let user: any = null;

export function setupUserEvents(u: any) {
  user = u;

  const view = document.querySelector("#view");
  if (!view) return;

  view.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;

    if (target.id === "save-profile-btn") {
      const email = (document.querySelector("#edit-email") as HTMLInputElement).value;
      const name = (document.querySelector("#edit-name") as HTMLInputElement).value;
      const surname = (document.querySelector("#edit-surname") as HTMLInputElement).value;
      const password = (document.querySelector("#edit-password") as HTMLInputElement).value;

      try {
        const updatedUser: UserInput = {
          email,
          name,
          surname,
          password,
          image: user.image,
          created: user.created,
          updated: new Date().toISOString(),
        };

        await updateUser(user.id, updatedUser);
        alert("Profil oppdatert");

      } catch (error) {
        console.error(error);
        alert("Kunne ikke oppdatere profil");
      }
    }

    if (target.id === "delete-profile-btn") {
      const confirmed = confirm("Er du sikker på at du vil slette bruker?");
      if (!confirmed) return;

      try {
        await deleteUser(user.id);
        alert("Bruker slettet");

      } catch (error) {
        console.error(error);
        alert("Kunne ikke slette bruker");
      }
    }
  });
}