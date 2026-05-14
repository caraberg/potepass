import "./style.css";

import { renderHomePage } from "./pages/forside/forside";
import { renderHeader } from "./components/header";
import { renderFooter } from "./components/footer";
import { renderBookings } from "./pages/bookings/bookings";
import { renderPetSittersPage, setupPetSittersEvents } from "./pages/petsitters/petsitters";
import { renderProfile } from "./pages/users/users";

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

if (!view) {
  throw new Error("Fant ikke #view");
}

renderPage();

async function renderPage() {
  const path = window.location.pathname;

  if (path === "/profile") {
    renderProfile(view!);
    return;
  }

  if (path === "/" || path === "/forside") {
    renderHomePage(view!);
    return;
  }

if (path === "/petsitters") {
  view!.innerHTML = await renderPetSittersPage();
  setupPetSittersEvents();
  return;
}

  if (path === "/bookings") {
    renderBookings(view!);
    return;
  }

  // Hvis ingen treff, bruk startside
  renderHomePage(view!);
}

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


