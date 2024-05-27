import { UserData } from "./interfaces";

export type ReservationItem = {
  activityId: number;
  price: number;
  activityName: string;
  startTime: string;
  endTime: string;
};

export type Reservation = {
  tempReservationId: string;
  activityType: string;
  noOfAdults: number;
  noOfChildren: number;
  reservationItems: ReservationItem[];
  totalPrice: number;
};

export type AvailableActivity = {
  date: Date;
  activityType: string;
  noOfAdults: number;
  noOfChildren: number;
  startTime: string;
};

export type Username = Pick<UserData, "username">;