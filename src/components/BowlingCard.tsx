import bowling from "@/assets/bowling.png";
import { cn } from "@/lib/utils";
// type BowlingCardProps = {
//   activity: string;
//   date: string;
//   startTime: string;
//   endTime: string;
//   quantity: number;
//   price: number;
//   hours: number;
// };

type ReservationItem = {
  activityId: number;
  price: number;
  startTime: string;
  endTime: string;
};

type Reservation = {
  activityType: string;
  noOfAdults: number;
  noOfChildren: number;
  reservationItems: ReservationItem[];
  totalPrice: number;
};

const BowlingCard = (reservation: Reservation) => {
  const startTime = new Date(reservation.reservationItems[0].startTime);
  startTime.setHours(startTime.getHours() + 2);
  const endTime = new Date(reservation.reservationItems[0].endTime);
  endTime.setHours(endTime.getHours() + 2);
  const diff = endTime.getHours() - startTime.getHours();

  const formatedDate = startTime.toISOString().substring(0, 10);

  return (
    <article
      className={cn(
        "flex w-full sm:w-[534px] gap-10 p-6 bg-gray-100 rounded cursor-pointer  hover:opacity-70"
      )}
    >
      <img className="w-[150px] rounded" src={bowling} alt="" />
      <div className="w-full">
        <p className="text-xl font-bold">
          {reservation.activityType} - {diff} {diff > 1 ? "timer" : "time"}
        </p>
        <p className="opacity-55">
          {formatedDate} kl: {startTime.toISOString().substring(11, 16)} -{" "}
          {endTime.toISOString().substring(11, 16)}
        </p>
        <div className="mt-2">
          <p>
            {reservation.reservationItems.length}{" "}
            {reservation.reservationItems.length > 1 ? "baner" : "bane"}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold">{reservation.totalPrice},00 kr.</p>
        </div>
      </div>
    </article>
  );
};

export default BowlingCard;
