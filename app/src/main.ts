import "./style.css";

import { renderHeader } from "./components/header";
import { renderFooter } from "./components/footer";
import { renderBookings } from "./pages/bookings/bookings";
import { renderPetSittersPage, setupPetSittersEvents } from "./pages/petsitters/petsitters";
// import { renderUsers } from "./pages/users/users";


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

setupBurgerMenu();

function setupBurgerMenu() {
  const burger = document.querySelector<HTMLElement>(".burger");
  const nav = document.querySelector<HTMLElement>(".nav");
if (burger && nav) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("active");
  });
}
}

const view = document.querySelector<HTMLElement>("#view");

if (!view) {
  throw new Error("Fant ikke #view");
}

function showBookings() {
  renderBookings(view!);
}

// function showUsers() {
//   renderUsers(view!);
// }

async function showPetSitters() {
  view!.innerHTML = await renderPetSittersPage();
  setupPetSittersEvents();
}

// STARTSIDE
showBookings();

// navigation header
// const navUsers = document.querySelector<HTMLElement>("#profile");
const navPetSitters = document.querySelector<HTMLElement>("#petsitters");
const navBookings = document.querySelector<HTMLElement>("#bookings");
const navLogout = document.querySelector<HTMLElement>("#logout");

//navigation footer
// const footerNavUsers = document.querySelector<HTMLElement>("#footer_profile");
const footerNavPetSitters = document.querySelector<HTMLElement>("#footer_petsitters");
const footerNavBookings = document.querySelector<HTMLElement>("#footer_bookings");

//navigation logo
const logoLink = document.querySelector<HTMLElement>(".logo_link");
const footerHome = document.querySelector<HTMLElement>(".footer_logo_link");

logoLink?.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  showBookings();
});

footerHome?.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  showBookings();
});

navBookings?.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  showBookings();
});

navPetSitters?.addEventListener("click", async (e: MouseEvent) => {
  e.preventDefault();
  await showPetSitters();
});

// const navUsers = document.querySelector<HTMLElement>("#profile");
// navUsers?.addEventListener("click", (e: MouseEvent) => {
//   e.preventDefault();
//   showUsers();
// });

navLogout?.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  console.log("Logg ut kommer snart!");
});


footerNavBookings?.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  showBookings();
});

footerNavPetSitters?.addEventListener("click", async (e: MouseEvent) => {
  e.preventDefault();
  await showPetSitters();
});

// const footerNavUsers = document.querySelector<HTMLElement>("#footer_profile");
// footerNavUsers?.addEventListener("click", (e: MouseEvent) => {
//   e.preventDefault();
//   showUsers();
// });