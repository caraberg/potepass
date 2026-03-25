import "./bookings.css";
import { getBookings } from "../../api/bookingsApi";
import type { Booking } from "../../types/bookings";

export async function renderBookings(view: HTMLElement) {
  const bookings: Booking[] = await getBookings();

  view.innerHTML = `
    <div class="booking_btn">
      <h1>Mine bookinger</h1>
      <button class="ny_booking">+ Ny booking</button>
    </div>

    <div class="cards_container"></div>
  `;

  const container = view.querySelector(".cards_container") as HTMLElement;

  //only 1 card now, but we will render more when we have Api ready
  const listToRender = bookings.slice(0, 1);

  listToRender.forEach((booking) => {
    const card = document.createElement("div");

    const dogImage =
      booking.userDogId === 1
        ? "/schafer.jpg"
        : "/dog2.jpg";

    card.classList.add("card_wrapper");

    card.innerHTML = `
      <img class="card_img" src="${dogImage}" alt="hund">

      <div class="card_info">
        
        <div class="name">
          <h2>${booking.userDogId} hos ${booking.petSitterId}</h2>
          <img src="/Note_Edit.png" class="edit">
        </div>

        <div class="date">
          <img src="/calendar.png">
          <span>${booking.fromDate} - ${booking.toDate}</span>
        </div>

        <div class="card_btn">
          <button class="det_del">Detaljer</button>
          <button class="det_del delete-btn">Slett</button>
        </div>

      </div>
    `;

    container.appendChild(card);
  });

  // button with POST)
  const newBookingBtn = view.querySelector(".ny_booking");

  newBookingBtn?.addEventListener("click", () => {
    console.log("Создание новой брони (POST будет тут)");
  });
}