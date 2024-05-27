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

export type Item = {
  id: number;
  activityName: string;
  price: number;
  startTime: string;
  endTime: string;
};

export type Order = {
  id: number;
  noOfParticipants: number;
  date: string;
  userName: string;
  reservationItems: Item[];
  confirmed: boolean;
};
