// Ivan Drozd

const API_URL = "http://localhost:3000/api/bookings";
const API_KEY = "12345";

// import type { Booking } from "../types/bookings";
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

type User = {
id: number;
userName: string;
password: string;
email: string;
description: string;
dogs: {
  id: number;
  name: string;
  breed: string;
  age: number;
  allergies: string[];
}[];
created: string;
updated: string;
};

export const getBookings = async (): Promise<Booking[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(res.status.toString());
  return res.json();
};

// find dogs from api users 
export const getUsers = async (): Promise<User[]> => {
  const res = await fetch("http://localhost:3000/api/users");
  if (!res.ok) throw new Error(res.status.toString());
  return res.json();
};

export const createBooking = async (
  data: Partial<Booking>
): Promise<Booking> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(res.status.toString());
  return res.json();
};

export const updateBooking = async (
  id: string,
  data: Partial<Booking>
): Promise<Booking> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(res.status.toString());
  return res.json();
};

export const deleteBooking = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!res.ok) throw new Error(res.status.toString());
};

