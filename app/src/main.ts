import "./style.css";

import { renderHeader } from "./components/header";
import { renderFooter } from "./components/footer";
import { renderBookings } from "./pages/bookings/bookings";
// import {renderUsersEditForm, setupUserEvents} from "./pages/users/users"; 
import {
  renderPetSittersPage,
  setupPetSittersEvents,
} from "./pages/petsitters/petsitters";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Fant ikke #app");
}

app.innerHTML = ` 
${renderHeader()}
  <main>
    <section id="view"></section>
  </main>
${renderFooter()}
`;


const view = document.querySelector<HTMLElement>("#view");


function showBookings() {
  renderBookings(view!);
}

// function showUsers() {
//   renderUsers(view!);
// }

// function showPetsitters() {
//   renderPetSitters(view!);
// }

showBookings();

// NAVIGASJON
const navUsers = document.querySelector<HTMLElement>("#profile");
const navPetSitters = document.querySelector<HTMLElement>("#petsitters");
const navBookings = document.querySelector<HTMLElement>("#bookings");
const navLogout = document.querySelector<HTMLElement>("#logout");


// For å kunne klikke på logoen for å komme til startsiden
const logoLink = document.querySelector<HTMLElement>(".logo_link");
logoLink?.addEventListener("click", (e) => {
  e.preventDefault();
  showBookings();
});
navBookings?.addEventListener("click", (e) => {
  e.preventDefault();
  showBookings();
});
// navPetSitters?.addEventListener("click", (e) => {
//   e.preventDefault();
//   showPetsitters();
// });
// navUsers?.addEventListener("click", (e) => { 
//   e.preventDefault();
//   renderUsers(view!);
// });
navLogout?.addEventListener("click", (e) => {
  e.preventDefault();
 console.log("Logg ut kommer snart!");
});




(async () => {
  const view = document.querySelector<HTMLElement>("#view");

  if (!view) {
    throw new Error("Fant ikke #view");
  }

  view.innerHTML = await renderPetSittersPage();
  setupPetSittersEvents();
})();
