import bowling from "@/assets/bowling.png";
import airhockey from "@/assets/airhockey.png";
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
  activityName: string;
  startTime: string;
  endTime: string;
};

type Reservation = {
  tempReservationId: string;
  activityType: string;
  noOfAdults: number;
  noOfChildren: number;
  reservationItems: ReservationItem[];
  totalPrice: number;
};

type ActivityCardProps = {
  reservation: Reservation;
  handleAddToCart: (reservation: Reservation) => void;
  choosen: boolean;
};

const ActivityCard = (props: ActivityCardProps) => {
  const { reservation, handleAddToCart } = props;

  const startTime = new Date(reservation.reservationItems[0].startTime);
  startTime.setHours(startTime.getHours() + 2);
  const endTime = new Date(reservation.reservationItems[0].endTime);
  endTime.setHours(endTime.getHours() + 2);
  const diff = endTime.getHours() - startTime.getHours();

  const formatedDate = startTime.toISOString().substring(0, 10);

  let activityType;

  const hours = diff > 1 ? "timer" : "time";

  if (reservation.activityType === "Bowling")
    activityType = "Bowling (" + diff + " " + hours + ")";
  if (reservation.activityType === "Air Hockey")
    activityType = "Air Hockey (" + diff + " " + hours + ")";
  if (reservation.activityType === "Bowling+Dining")
    activityType = "Bowling (" + diff + " " + hours + ") inkl. Middag";
  if (reservation.activityType === "Air Hockey+Dining")
    activityType = "Air Hockey (" + diff + " " + hours + ") inkl. Middag";

  const eventStartTime = startTime;
  const eventEndTime = new Date(
    reservation.reservationItems[
      reservation.reservationItems.length - 1
    ].endTime
  );
  eventEndTime.setHours(eventEndTime.getHours() + 2);

  // Number of lanes or airhockey tables
  const numberOfLanes = reservation.reservationItems.reduce((acc, item) => {
    if (item.activityName == "Bowling" || item.activityName == "Air Hockey") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const image =
    reservation.activityType.toLowerCase().indexOf("bowling") != -1
      ? bowling
      : airhockey;

  return (
    <article
      className={cn(
        "flex w-full sm:w-[534px] gap-10 p-6 bg-gray-100 rounded cursor-pointer hover:shadow-lg transition duration-300 ease-in-out",
        props.choosen ? "bg-gray-300" : ""
      )}
      onClick={() => handleAddToCart(reservation)}
    >
      <img className="w-[150px] rounded" src={image} alt="" />
      <div className="w-full">
        <p className="text-xl font-bold">{activityType}</p>
        <p className="opacity-55">
          {formatedDate} kl: {eventStartTime.toISOString().substring(11, 16)} -{" "}
          {eventEndTime.toISOString().substring(11, 16)}
        </p>
        <div className="mt-2">
          <p>
            {numberOfLanes} {numberOfLanes > 1 ? "baner" : "bane"}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold">{reservation.totalPrice},00 kr.</p>
        </div>
      </div>
    </article>
  );
};

export default ActivityCard;
