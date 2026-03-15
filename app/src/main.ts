
import "./style.css";

import { renderHeader } from "./components/header";
import { renderFooter } from "./components/footer";
// import { renderBookings } from "./pages/bookings/bookings";

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

