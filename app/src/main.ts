import "./style.css";

import { renderHeader } from "./components/header";
import { renderFooter } from "./components/footer";
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

(async () => {
  const view = document.querySelector<HTMLElement>("#view");

  if (!view) {
    throw new Error("Fant ikke #view");
  }

  view.innerHTML = await renderPetSittersPage();
  setupPetSittersEvents();
})();