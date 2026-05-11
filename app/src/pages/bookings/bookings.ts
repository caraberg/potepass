// Ivan Drozd 

import "./bookings.css";
import {
  getBookings,
  getUsers,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../../api/bookingsApi";
import { getPetSitters } from "../../api/petsittersApi";
import type { Booking } from "../../api/bookingsApi";

const CURRENT_USER_ID = 1; // hardcoded for now, since we don't have authentication

function showToast(text: string, type: "success" | "error" | "info") {
  const toast = document.createElement("div");

  toast.className = `toast ${type}`;
  toast.textContent = text;

  document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
}

export async function renderBookings(view: HTMLElement) {
  try{
      view.innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Laster bookinger...</p>
      </div>
      `;
  const bookings = await getBookings();
  const users = await getUsers();
  const petsitters = await getPetSitters();

  view.innerHTML = `
    <div class="booking_btn">
      <h1>Mine bookinger</h1>
      <button class="ny_booking">+ Ny booking</button>
    </div>

    <div class="cards_container"></div>
  `;

  const container = view.querySelector(".cards_container") as HTMLElement; 

  // btn create
  view.querySelector(".ny_booking")?.addEventListener("click", () => {
    openCreateModal(view);
  });

  // show all bookings for current user
  const currentUserBookings = bookings.filter(
   (booking) => booking.userId === CURRENT_USER_ID
  );

  currentUserBookings.forEach((booking) => {
    const user = users.find((u) => u.id === booking.userId);
    if (!user) return;

    const dog = user.dogs.find((d) => d.id === booking.userDogId);
    const sitter = petsitters.find(
      (s: any) => s.id === booking.petSitterId
    );

    const card = document.createElement("div");
    card.classList.add("card_wrapper");

    card.innerHTML = `
      <div class="details_image">
      <img src="/schafer.jpg"  alt="${dog?.name || 'dog'}">
      </div>

      <div class="card_info">
        <div class="name">
          <h2>${dog?.name || "Dog"} hos ${sitter?.name || "Sitter"}</h2>
          <img src="/Note_Edit.png" class="edit" alt="Rediger booking">
        </div>

        <div class="date">
          <img src="/calendar.png" class="calendar" alt="Kalender ikon">
          <span>${booking.fromDate } - ${booking.toDate}</span>
        </div>
<div class="status ${booking.status}">
  ${booking.status}
</div>
        <div class="card_btn">
          <button class="det_del details_btn">Detaljer</button>
          <button class="det_del delete_btn">Slett</button>
        </div>
      </div>
    `;

    // btn edit
    card.querySelector(".edit")?.addEventListener("click", () => {
      openEditModal(view, booking);
    });

    // btn details
    card.querySelector(".details_btn")?.addEventListener("click", () => {
      renderBookingDetails(view, booking.id);
    });

    // btn delete
    card.querySelector(".delete_btn")?.addEventListener("click", () => {
      openDeleteModal(view, booking.id);
    });

    container.appendChild(card);
  });
    } catch (error) {
    view.innerHTML = `<p>Noe gikk galt</p>`;
    console.error(error);
  }
}

// open modal with pre-selected petSitter
export async function openCreateModalForPetSitter(
  view: HTMLElement,
  selectedPetSitterId: number
) {
  openCreateModal(view, selectedPetSitterId);
}

async function openCreateModal(view: HTMLElement, selectedPetSitterId?: number) {
  const users = await getUsers();
  const user = users.find((u) => u.id === CURRENT_USER_ID);
  const petSitters = await getPetSitters();

  if (!user) return;

  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <h2>Ny booking</h2>
      <div class="divider-modal"></div>

      <label>Velg hund</label>
      <select id="dog">
        ${user.dogs.map((d) => `<option value="${d.id}">${d.name}</option>`).join("")}
      </select>

    <label ${selectedPetSitterId ? 'style="display:none;"' : ""}>
     Velg hundepasser
    </label>

    <select id="sitter" ${selectedPetSitterId ? 'style="display:none;"' : ""}>
    ${petSitters.map((s: any) => `
    <option value="${s.id}" ${selectedPetSitterId === s.id ? "selected" : ""}>
      ${s.name}
    </option>
    `).join("")}
    </select>

      <label>Fra dato</label>
      <input type="date" id="fromDate">

      <label>Til dato</label>
      <input type="date" id="toDate">

      <label>Melding</label>
      <input type="text" id="message">

      <div class="modal-buttons">
        <button class="btn-secondary" id="closeModal">Avbryt</button>
        <button class="btn-primary" id="saveBooking">Send forespørsel</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#closeModal")?.addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector("#saveBooking")?.addEventListener("click", async () => {
    try {
          const fromDate = (
      modal.querySelector("#fromDate") as HTMLInputElement
    ).value;
    const toDate = (
      modal.querySelector("#toDate") as HTMLInputElement
    ).value;
    const message = (
      modal.querySelector("#message") as HTMLInputElement
    ).value;

    if (!fromDate || !toDate || !message.trim()) {
      showToast("Fyll inn alle felter", "error");
      return;
    }
    await createBooking({
      userId: CURRENT_USER_ID,
      userDogId: Number((modal.querySelector("#dog") as HTMLSelectElement).value),
      petSitterId:selectedPetSitterId
      ? selectedPetSitterId
      : Number((modal.querySelector("#sitter") as HTMLSelectElement).value),
      fromDate,
      toDate,
      message,
      status: "pending",
    });

    modal.remove();
    showToast("Booking opprettet", "success");
    renderBookings(view);
    } catch (error) {
      showToast("Kunne ikke opprette booking", "error");
    }
  });
}

function openEditModal(view: HTMLElement, booking: Booking) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <h2>Oppdater booking</h2>
      <div class="divider-modal"></div>

      <label>Fra dato</label>
      <input type="date" id="fromDate" value="${booking.fromDate}">

      <label>Til dato</label>
      <input type="date" id="toDate" value="${booking.toDate}">

      <label>Melding</label>
      <input type="text" id="message" value="${booking.message || ""}">

      <div class="modal-buttons">
        <button class="btn-secondary" id="close">Avbryt</button>
        <button class="btn-primary" id="save">Lagre</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#close")?.addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector("#save")?.addEventListener("click", async () => {
      try {
    const fromDate = (
      modal.querySelector("#fromDate") as HTMLInputElement
    ).value;

    const toDate = (
      modal.querySelector("#toDate") as HTMLInputElement
    ).value;

    const message = (
      modal.querySelector("#message") as HTMLInputElement
    ).value;

    if (
      fromDate === booking.fromDate &&
      toDate === booking.toDate &&
      message === booking.message
    ) {
      showToast("Ingen endringer ble gjort", "info");
      return;
    }
    await updateBooking(booking.id.toString(), {
      ...booking,
      fromDate,
      toDate,
      message,
      status: "pending",
    });

    modal.remove();
    showToast("Booking oppdatert", "success");
    renderBookings(view);
      } catch {
    showToast("Kunne ikke oppdatere booking", "error");
  }
  });
}

async function renderBookingDetails(view: HTMLElement, id: number) {
  try {
    view.innerHTML = `
    <div class="loading-container">
     <p>Laster detaljer...</p>
    </div>
    `;

  const bookings = await getBookings();
  const users = await getUsers();
  const petSitters = await getPetSitters();

  const booking = bookings.find((b) => b.id === id);
  if (!booking) return;

  const user = users.find((u) => u.id === booking.userId);
  if (!user) return;

  const dog = user.dogs.find((d) => d.id === booking.userDogId);
  const sitter = petSitters.find((s: any) => s.id === booking.petSitterId);

  view.innerHTML = `
    <div class="details_container">

      <h1>Booking detaljer</h1>
      <div class="details_card">

        <div class="details_content">

          <div class="details_row">
            <span>Hund</span>
            <p>${dog?.name || "-"}</p>
          </div>

          <div class="divider"></div>

          <div class="details_row">
            <span>Hundepasser</span>
            <p>${sitter?.name || "-"}</p>
          </div>

          <div class="divider"></div>

          <div class="details_row">
            <span>Periode</span>
            <p>${booking.fromDate} – ${booking.toDate}</p>
          </div>

          <div class="divider"></div>

          <div class="details_row">
            <span>Status</span>
            <p class="status">${booking.status}</p>
          </div>

        </div>

       <div class="details_image">
        <img src="/schafer.jpg">
       </div>

      </div>

      
    <div class="details_actions">
      <button class="item-btn" id="back">← Tilbake</button>
      ${
       booking.status === "pending"
        ? `
        <div class="rights_actions">
          <button id="approve">Godkjenn</button>
          <button id="reject">Avslå</button>
        </div>
    </div>
  `
    : ""
}
    </div>
  `;

  view.querySelector("#back")?.addEventListener("click", () => {
    renderBookings(view);
  });
  if (booking.status === "pending") {
      view.querySelector("#approve")?.addEventListener("click", async () => {
        try {
          await updateBooking(booking.id.toString(), {
            ...booking,
            status: "approved",
          });
          showToast("Booking godkjent", "success");
          renderBookingDetails(view, booking.id);
        } catch {
          showToast("Kunne ikke oppdatere booking", "error");
        }
      });

      view.querySelector("#reject")?.addEventListener("click", async () => {
        try {
          await updateBooking(booking.id.toString(), {
            ...booking,
            status: "rejected",
          });
          showToast("Booking avslått", "success");
          renderBookingDetails(view, booking.id);
        } catch {
          showToast("Kunne ikke oppdatere booking", "error");
        }
      });
    }
  } catch (error) {
    view.innerHTML = `<p>Noe gikk galt</p>`;
  }
}


function openDeleteModal(view: HTMLElement, bookingId: number) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <h2>Slett booking</h2>
      <div class="divider-modal"></div>

      <p>Er du sikker?</p>

      <div class="modal-buttons">
        <button class="btn-secondary" id="no">Avbryt</button>
        <button class="btn-danger" id="yes">Slett</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#no")?.addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector("#yes")?.addEventListener("click", async () => {
    try {
    await deleteBooking(bookingId.toString());

    modal.remove();
    showToast("Booking slettet", "success");
    renderBookings(view);
      } catch {
    showToast("Kunne ikke slette booking", "error");
  }
  });
}