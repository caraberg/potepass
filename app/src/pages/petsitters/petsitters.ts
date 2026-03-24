// Fullt navn: Carina Alexandra Bergman

import "./petsitters.css";
import {
  getPetSitters,
  createPetSitter,
  updatePetSitter,
  deletePetSitter,
} from "../../api/petsittersApi";

type PetSitter = {
  id: number;
  name: string;
  location: string;
  pricePerDay: number;
  rating: number;
  reviewCount: number;
  maxDogs: number;
  acceptsPuppies: boolean;
  acceptsLargeDogs: boolean;
  yearsOfExperience: number;
  experienceDescription: string;
  available: boolean;
  created: string;
  updated: string;
  image: string;
};

let petSitters: PetSitter[] = [];
let eventsInitialized = false;

let cityFilter = "";
let priceFromFilter = "";
let priceToFilter = "";
let availableOnlyFilter = false;
let visibleCount = 2;

function nowIsoString() {
  return new Date().toISOString();
}

async function loadPetSitters() {
  try {
    petSitters = await getPetSitters();
  } catch (error) {
    console.error("Feil ved henting av hundepassere:", error);
    petSitters = [];
  }
}

function getFilteredPetSitters() {
  return petSitters.filter((petSitter) => {
    const matchesCity =
      cityFilter.trim() === "" ||
      petSitter.location.toLowerCase().includes(cityFilter.toLowerCase());

    const matchesPriceFrom =
      priceFromFilter.trim() === "" ||
      petSitter.pricePerDay >= Number(priceFromFilter);

    const matchesPriceTo =
      priceToFilter.trim() === "" ||
      petSitter.pricePerDay <= Number(priceToFilter);

    const matchesAvailability =
      !availableOnlyFilter || petSitter.available === true;

    return (
      matchesCity &&
      matchesPriceFrom &&
      matchesPriceTo &&
      matchesAvailability
    );
  });
}

async function renderListView() {
  const view = document.querySelector<HTMLElement>("#view");
  if (!view) return;

  view.innerHTML = await renderPetSittersPage();
}

function showToast(message: string) {
  const toast = document.querySelector<HTMLElement>("#confirmation-toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 1800);
}

/* LISTEVISNING */

export async function renderPetSittersPage(): Promise<string> {
  await loadPetSitters();

  const filteredPetSitters = getFilteredPetSitters();
  const visiblePetSitters = filteredPetSitters.slice(0, visibleCount);

  const totalPetSitters = petSitters.length;
  const availablePetSitters = petSitters.filter((p) => p.available).length;

  const prices = petSitters.map((p) => p.pricePerDay);
  const averagePrice =
    prices.length > 0
      ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length)
      : 0;

  const petSittersHtml =
    visiblePetSitters.length > 0
      ? visiblePetSitters
          .map(
            (petSitter) => `
              <article class="petsitter-card">
                <img class="petsitter-image" src="${petSitter.image}" alt="${petSitter.name}" />

                <div class="petsitter-info">
                  <h3>${petSitter.name}</h3>
                  <p>📍 ${petSitter.location}</p>
                  <p>☆ ${petSitter.rating}</p>
                  <p>⏲ Fra ${petSitter.pricePerDay}kr/dag</p>
                </div>

                <button class="details-btn" data-id="${petSitter.id}">Se mer</button>
              </article>
            `
          )
          .join("")
      : `<p>Ingen hundepassere matcher filtrene.</p>`;

  const showMoreButton =
    filteredPetSitters.length > visibleCount
      ? `<button class="show-more-btn" id="show-more-btn">Vis flere</button>`
      : "";

  return `
    <section class="petsitters-page">
      <div class="petsitters-layout">
        
        <aside class="petsitters-filter">
          <h2>Filter</h2>

          <label for="city">Sted</label>
          <input
            id="city"
            type="text"
            placeholder="Sted..."
            value="${cityFilter}"
          />

          <label>Pris</label>
          <div class="price-row">
            <input
              id="price-from"
              type="text"
              placeholder="Fra kr"
              value="${priceFromFilter}"
            />
            <input
              id="price-to"
              type="text"
              placeholder="Til kr"
              value="${priceToFilter}"
            />
          </div>

          <label class="availability-row">
            <input
              id="available-only"
              type="checkbox"
              ${availableOnlyFilter ? "checked" : ""}
            />
            <span>Tilgjengelig</span>
          </label>

          <button class="apply-filter-btn" id="apply-filter-btn">Søk</button>
          <button class="reset-filter-btn" id="reset-filter-btn">Nullstill filter</button>
        </aside>

        <section class="petsitters-content">
          <div class="petsitters-stats">
            <article class="stat-card">
              <p>Hundepassere</p>
              <span>${totalPetSitters}</span>
            </article>

            <article class="stat-card">
              <p>Tilgjengelige</p>
              <span>${availablePetSitters}</span>
            </article>

            <article class="stat-card">
              <p>Snittpris</p>
              <span>${averagePrice}kr</span>
            </article>
          </div>

          <div class="petsitters-title-row">
            <h1>Hundepassere</h1>
            <button class="petsitters-new-btn" id="open-modal-btn">+ Ny</button>
          </div>

          <div class="petsitters-list">
            ${petSittersHtml}
            ${showMoreButton}
          </div>
        </section>
      </div>

      <div class="petsitter-modal-overlay hidden" id="petsitter-modal-overlay">
        <div class="petsitter-modal">
          <h2>Ny hundepasser</h2>

          <label for="modal-name">Navn:</label>
          <input id="modal-name" type="text" />

          <label for="modal-city">Sted:</label>
          <input id="modal-city" type="text" />

          <div class="modal-row">
            <div class="modal-price-group">
              <label for="modal-price">Pris:</label>
              <input id="modal-price" type="text" />
            </div>

            <label class="modal-checkbox-group" for="modal-available">
              <span>Tilgjengelig:</span>
              <input id="modal-available" type="checkbox" />
            </label>
          </div>

          <label for="modal-description">Beskrivelse:</label>
          <textarea id="modal-description"></textarea>

          <div class="modal-buttons">
            <button class="modal-cancel-btn" id="close-modal-btn">Avbryt</button>
            <button class="modal-save-btn" id="save-modal-btn">Lagre</button>
          </div>
        </div>
      </div>

      <div class="confirmation-toast hidden" id="confirmation-toast">
        Hundepasser oppdatert
      </div>
    </section>
  `;
}

/* DETALJVISNING */

export function renderPetSitterDetail(id: number): string {
  const petSitter = petSitters.find((item) => item.id === id);

  if (!petSitter) {
    return `<p>Fant ikke hundepasser.</p>`;
  }

  return `
    <section class="petsitter-detail">
      <div class="petsitter-detail-card">
        <div class="petsitter-detail-actions">
          <button class="detail-icon-btn" id="delete-btn" data-id="${petSitter.id}" aria-label="Slett">🗑️</button>
          <button class="detail-icon-btn" id="edit-btn" data-id="${petSitter.id}" aria-label="Rediger">✏️</button>
        </div>

        <div class="petsitter-detail-content">
          <div class="petsitter-detail-left">
            <img src="${petSitter.image}" class="petsitter-detail-image" alt="${petSitter.name}" />

            <div class="petsitter-detail-info">
              <h2>${petSitter.name}</h2>
              <p>📍 ${petSitter.location}</p>
              <p>☆ ${petSitter.rating}</p>
              <p>⏲ Fra ${petSitter.pricePerDay}kr/dag</p>
              <p><strong>Erfaring:</strong> ${petSitter.yearsOfExperience} år</p>
              <p><strong>Maks hunder:</strong> ${petSitter.maxDogs}</p>
              <p><strong>Valper:</strong> ${petSitter.acceptsPuppies ? "Ja" : "Nei"}</p>
            </div>
          </div>

          <div class="petsitter-detail-right">
            <h2>Beskrivelse</h2>
            <p>${petSitter.experienceDescription}</p>
          </div>
        </div>

        <div class="petsitter-detail-buttons">
          <button class="back-btn">Tilbake</button>
          <button class="book-btn" id="book-btn">Book hundepasser</button>
        </div>
      </div>

      <div class="delete-confirmation hidden" id="delete-confirmation">
        <p>Er du sikker på at du vil slette?</p>
        <div class="delete-confirmation-buttons">
          <button id="cancel-delete-btn" class="delete-cancel-btn">Avbryt</button>
          <button id="confirm-delete-btn" class="delete-confirm-btn">Slett</button>
        </div>
      </div>

      <div class="confirmation-toast hidden" id="confirmation-toast">
        Hundepasser oppdatert
      </div>

      <div class="petsitter-modal-overlay hidden" id="edit-modal-overlay">
        <div class="petsitter-modal">
          <h2>Rediger hundepasser</h2>

          <label for="edit-name">Navn:</label>
          <input id="edit-name" type="text" value="${petSitter.name}" />

          <label for="edit-city">Sted:</label>
          <input id="edit-city" type="text" value="${petSitter.location}" />

          <div class="modal-row">
            <div class="modal-price-group">
              <label for="edit-price">Pris:</label>
              <input id="edit-price" type="text" value="${petSitter.pricePerDay}" />
            </div>

            <label class="modal-checkbox-group" for="edit-available">
              <span>Tilgjengelig:</span>
              <input id="edit-available" type="checkbox" ${
                petSitter.available ? "checked" : ""
              } />
            </label>
          </div>

          <label for="edit-description">Beskrivelse:</label>
          <textarea id="edit-description">${petSitter.experienceDescription}</textarea>

          <div class="modal-buttons">
            <button class="modal-cancel-btn" id="close-edit-modal-btn">Avbryt</button>
            <button class="modal-save-btn" id="save-edit-modal-btn" data-id="${petSitter.id}">Lagre</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* EVENTS */

export function setupPetSittersEvents() {
  if (eventsInitialized) return;

  const view = document.querySelector("#view");
  if (!view) return;

  eventsInitialized = true;

  view.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;

    if (target.id === "apply-filter-btn") {
      visibleCount = 2;
      await renderListView();
      return;
    }

    if (target.id === "reset-filter-btn") {
      cityFilter = "";
      priceFromFilter = "";
      priceToFilter = "";
      availableOnlyFilter = false;
      visibleCount = 2;
      await renderListView();
      return;
    }

    if (target.classList.contains("details-btn")) {
      const id = Number(target.dataset.id);
      view.innerHTML = renderPetSitterDetail(id);
      return;
    }

    if (target.id === "back-btn" || target.classList.contains("back-btn")) {
      await renderListView();
      return;
    }

    if (target.id === "show-more-btn") {
      visibleCount += 2;
      await renderListView();
      return;
    }

    if (target.id === "open-modal-btn") {
      const overlay = document.querySelector<HTMLElement>("#petsitter-modal-overlay");
      overlay?.classList.remove("hidden");
      return;
    }

    if (target.id === "close-modal-btn") {
      const overlay = document.querySelector<HTMLElement>("#petsitter-modal-overlay");
      overlay?.classList.add("hidden");
      return;
    }

    if (target.id === "petsitter-modal-overlay") {
      const overlay = document.querySelector<HTMLElement>("#petsitter-modal-overlay");
      overlay?.classList.add("hidden");
      return;
    }

    if (target.id === "save-modal-btn") {
      const nameInput = document.querySelector<HTMLInputElement>("#modal-name");
      const cityInput = document.querySelector<HTMLInputElement>("#modal-city");
      const priceInput = document.querySelector<HTMLInputElement>("#modal-price");
      const availableInput = document.querySelector<HTMLInputElement>("#modal-available");
      const descriptionInput = document.querySelector<HTMLTextAreaElement>("#modal-description");

      if (!nameInput || !cityInput || !priceInput || !availableInput || !descriptionInput) {
        return;
      }

      try {
    await createPetSitter({
     name: nameInput.value,
     location: cityInput.value,
     pricePerDay: Number(priceInput.value) || 0,
     rating: 5,
     reviewCount: 0,
     maxDogs: 1,
     acceptsPuppies: true,
     acceptsLargeDogs: true,
     yearsOfExperience: 1,
     experienceDescription: descriptionInput.value,
     available: availableInput.checked,
     created: nowIsoString(),
     updated: nowIsoString(),
     image: "/dog.jpg",
     });

        const overlay = document.querySelector<HTMLElement>("#petsitter-modal-overlay");
        overlay?.classList.add("hidden");

        visibleCount = Math.max(visibleCount, 2);
        await renderListView();
        showToast("Hundepasser opprettet");
      } catch (error) {
        console.error(error);
        alert("Kunne ikke opprette hundepasser");
      }

      return;
    }

    if (target.id === "edit-btn") {
      const overlay = document.querySelector<HTMLElement>("#edit-modal-overlay");
      overlay?.classList.remove("hidden");
      return;
    }

    if (target.id === "close-edit-modal-btn") {
      const overlay = document.querySelector<HTMLElement>("#edit-modal-overlay");
      overlay?.classList.add("hidden");
      return;
    }

    if (target.id === "edit-modal-overlay") {
      const overlay = document.querySelector<HTMLElement>("#edit-modal-overlay");
      overlay?.classList.add("hidden");
      return;
    }

    if (target.id === "save-edit-modal-btn") {
      const id = Number(target.dataset.id);
      const existingPetSitter = petSitters.find((petSitter) => petSitter.id === id);

      const nameInput = document.querySelector<HTMLInputElement>("#edit-name");
      const cityInput = document.querySelector<HTMLInputElement>("#edit-city");
      const priceInput = document.querySelector<HTMLInputElement>("#edit-price");
      const availableInput = document.querySelector<HTMLInputElement>("#edit-available");
      const descriptionInput = document.querySelector<HTMLTextAreaElement>("#edit-description");

      if (
        !existingPetSitter ||
        !nameInput ||
        !cityInput ||
        !priceInput ||
        !availableInput ||
        !descriptionInput
      ) {
        return;
      }

      try {
        const updatedPetSitter: PetSitter = {
          ...existingPetSitter,
          name: nameInput.value,
          location: cityInput.value,
          pricePerDay: Number(priceInput.value) || 0,
          available: availableInput.checked,
          experienceDescription: descriptionInput.value,
          updated: nowIsoString(),
        };

        await updatePetSitter(id, updatedPetSitter);

        const overlay = document.querySelector<HTMLElement>("#edit-modal-overlay");
        overlay?.classList.add("hidden");

        await loadPetSitters();
        view.innerHTML = renderPetSitterDetail(id);
        showToast("Hundepasser oppdatert");
      } catch (error) {
        console.error(error);
        alert("Kunne ikke oppdatere hundepasser");
      }

      return;
    }

    if (target.id === "delete-btn") {
      const deleteConfirmation = document.querySelector<HTMLElement>("#delete-confirmation");
      deleteConfirmation?.classList.remove("hidden");
      return;
    }

    if (target.id === "cancel-delete-btn") {
      const deleteConfirmation = document.querySelector<HTMLElement>("#delete-confirmation");
      deleteConfirmation?.classList.add("hidden");
      return;
    }

    if (target.id === "confirm-delete-btn") {
      const deleteBtn = document.querySelector<HTMLElement>("#delete-btn");
      const id = Number(deleteBtn?.dataset.id);

      try {
        await deletePetSitter(id);

        const deleteConfirmation = document.querySelector<HTMLElement>("#delete-confirmation");
        deleteConfirmation?.classList.add("hidden");

        await renderListView();
        showToast("Hundepasser slettet");
      } catch (error) {
        console.error(error);
        alert("Kunne ikke slette hundepasser");
      }

      return;
    }
    if (target.id === "book-btn") {
       showToast("Booking funksjon kommer senere");
      return;
    }
    });

  view.addEventListener("change", (e) => {
    const target = e.target as HTMLElement;

    if (target.id === "city") {
      cityFilter = (target as HTMLInputElement).value;
    }

    if (target.id === "price-from") {
      priceFromFilter = (target as HTMLInputElement).value;
    }

    if (target.id === "price-to") {
      priceToFilter = (target as HTMLInputElement).value;
    }

    if (target.id === "available-only") {
      availableOnlyFilter = (target as HTMLInputElement).checked;
    }
  });


}