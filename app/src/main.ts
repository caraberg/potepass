
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
    <section id="view" class="content-container">
    
      <div class="dogs-pictures">
      <img class="dog-image" src="/schafer.jpg">
      <img class="dog-image dog-shepherd" src="/shepherd.jpg">
      <img class="dog-image" src="/dog.jpg">
      </div>

      <div class="text-frame"><br><p>Potepass kobler hundeeiere med trygge og pålitelige hundepassere i nærområdet.</p> 
      <br><p>Målet med Potepass er å gjøre det enkelt og trygt å finne omsorgsfull hjelp til hunden når man trenger det.</p>
      </div>

      </section>
  
      </main>
  ${renderFooter()}
`;

