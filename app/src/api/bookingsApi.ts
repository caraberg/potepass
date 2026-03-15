// Ivan Drozd

import type { Booking } from "../types/bookings";

const API_URL = "http://localhost:3000/api/bookings";

export async function getBookings(): Promise<Booking[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Booking[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}