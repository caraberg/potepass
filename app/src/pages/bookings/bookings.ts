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

type Booking = {
  id: number;
  userId: number;
  userDogId: number;
  petSitterId: number;
  fromDate: string;
  toDate: string;
  status: "pending";
  message: string;
  created: string;
  updated: string;
};


export async function renderBookings(view: HTMLElement) {
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

  // show all bookings
  bookings.forEach((booking) => {
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
          <img src="/Note_Edit.png" class="edit">
        </div>

        <div class="date">
          <img src="/calendar.png">
          <span>${booking.fromDate} - ${booking.toDate}</span>
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
}

async function openCreateModal(view: HTMLElement) {
  const users = await getUsers();
  const user = users.find((u) => u.id === 1);
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

      <label>Velg hundepasser</label>
      <select id="sitter">
        ${petSitters.map((s: any) => `<option value="${s.id}">${s.name}</option>`).join("")}
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
    await createBooking({
      userId: 1,
      userDogId: Number((modal.querySelector("#dog") as HTMLSelectElement).value),
      petSitterId: Number((modal.querySelector("#sitter") as HTMLSelectElement).value),
      fromDate: (modal.querySelector("#fromDate") as HTMLInputElement).value,
      toDate: (modal.querySelector("#toDate") as HTMLInputElement).value,
      message: (modal.querySelector("#message") as HTMLInputElement).value,
      status: "pending",
    });

    modal.remove();
    renderBookings(view);
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
    await updateBooking(booking.id.toString(), {
      ...booking,
      fromDate: (modal.querySelector("#fromDate") as HTMLInputElement).value,
      toDate: (modal.querySelector("#toDate") as HTMLInputElement).value,
      message: (modal.querySelector("#message") as HTMLInputElement).value,
    });

    modal.remove();
    renderBookings(view);
  });
}

async function renderBookingDetails(view: HTMLElement, id: number) {
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

      <button class="item-btn" id="back">← Tilbake</button>
    </div>
  `;

  view.querySelector("#back")?.addEventListener("click", () => {
    renderBookings(view);
  });
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
    await deleteBooking(bookingId.toString());

    modal.remove();
    renderBookings(view);
  });
}