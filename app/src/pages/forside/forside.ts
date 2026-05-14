import "./forside.css";

import { renderBookings } from "../bookings/bookings";
import {
  renderPetSittersPage,
  setupPetSittersEvents,
} from "../petsitters/petsitters";
import { renderProfile } from "../users/users";

export function renderHomePage(view: HTMLElement) {

  view.innerHTML = `
  <section class="home">

    <div class="hero">
      <h1>Velkommen til Potepass</h1>
      <p>
        Potepass kobler hundeeiere med trygge og
        pålitelige hundepassere i nærområdet.
      </p>
    </div>

    <div class="home_cards">
      <div class="home_card" id="profile-card">
        <div class="icon_wrapper">
          <img
            src="/user.svg"
            class="home_icon"
            alt="profile icon"
          />
        </div>
        <h2>Min profil</h2>
      </div>

      <div class="home_card" id="bookings-card">
        <div class="icon_wrapper">
          <img
            src="/calendar.svg"
            class="home_icon"
            alt="booking icon"
          />
        </div>
        <h2>Mine bookinger</h2>
      </div>

      <div class="home_card" id="petsitters-card">
        <div class="icon_wrapper">
          <img
            src="/dog-face.svg"
            class="home_icon"
            alt="dog icon"
          />
        </div>
        <h2>Finn hundepasser</h2>
      </div>
    </div>

  </section>
  `;

  //profile
  document
    .querySelector("#profile-card")
    ?.addEventListener("click", async () => {
      history.pushState({}, "", "/profile");
      await renderProfile(view);

    });

  // bookings
  document
    .querySelector("#bookings-card")
    ?.addEventListener("click", async () => {
      history.pushState({}, "", "/bookings");
      await renderBookings(view);
    });

  // petsitters
  document
    .querySelector("#petsitters-card")
    ?.addEventListener("click", async () => {
      history.pushState({}, "", "/petsitters");
      view.innerHTML = await renderPetSittersPage();
      setupPetSittersEvents();
    });
}