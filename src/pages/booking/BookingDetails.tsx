import { Reservation } from "@/interfaces/types";
import { createReservatition } from "@/services/api/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function BookingDetails() {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const navigate = useNavigate();

  const createReservation = async () => {
    console.log(reservation);
    if (!reservation) return;
    const response = await createReservatition(reservation);
    if (response.status === 200) {
      console.log("Reservation created:", response.data);
      localStorage.removeItem("reservation");
      navigate("/booking/confirmation", {
        state: {
          reservation: response.data,
          activity: reservation.activityType,
        },
      });
    } else {
      console.error("Failed to confirm reservation:", response.status);
    }
  };

  useEffect(() => {
    const reservation = JSON.parse(
      localStorage.getItem("reservation") as string
    );

    const noOfItems = reservation.reservationItems.length;
    setStartTime(new Date(reservation.reservationItems[0].startTime));
    setEndTime(new Date(reservation.reservationItems[noOfItems - 1].endTime));
    setReservation(reservation);
    console.log(reservation);
  }, []);

  return (
    <div className="max-w-[1080px] mx-auto  rounded">
      <div className="p-4 px-4 mt-6 bg-gray-100 max-w-[600px] mx-auto">
        <h1 className="text-2xl font-bold text-center">
          Reservations Detaljer
        </h1>
        <div className="flex flex-col items-center mt-6">
          <p className="mb-2 font-medium">
            Aktivitet:{" "}
            <span className="font-normal">
              {reservation?.activityType === "Bowling"
                ? "Bowling"
                : reservation?.activityType === "Air Hockey"
                ? "Air Hockey"
                : reservation?.activityType === "Bowling+Dining"
                ? "Bowling + Middag"
                : "Air Hockey + Middag"}
            </span>
          </p>
          <p className="mb-2 font-medium">
            Antal deltagere:{" "}
            <span className="font-normal">
              {(reservation?.noOfAdults ? reservation?.noOfAdults : 0) +
                (reservation?.noOfChildren ? reservation?.noOfChildren : 0)}
            </span>
          </p>
          <p className="mb-2 font-medium">
            Dato:{" "}
            <span className="font-normal">
              {startTime && startTime.toISOString().substring(0, 10)}
            </span>
          </p>
          <p className="mb-2 font-medium">
            Tid:{" "}
            <span className="font-normal">
              {startTime && startTime.toISOString().substring(11, 16)} -{" "}
              {endTime && endTime.toISOString().substring(11, 16)}
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center mt-6">
          <p className="mb-2 font-medium">Indtast navn på deltagere:</p>
          <div className="overflow-y-scroll max-h-[200px] w-[370px] scrollbar flex flex-col items-center">
            {reservation &&
              Array.from({
                length: reservation.noOfAdults + reservation.noOfChildren,
              }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder="Navn"
                  className="w-[350px] p-2 mt-2 border border-gray-300 rounded"
                />
              ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Button onClick={createReservation} className="mt-6 w-[350px]">
            Reserver
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
