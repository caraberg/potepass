// Ivan Drozd

export type Booking = {
  id: number;
  userId: number;
  userDogId: number;
  petSitterId: number;
  fromDate: string;
  toDate: string;
  status: "pending" | "approved" | "rejected";
  message: string;
  created: string;
  updated: string;
};