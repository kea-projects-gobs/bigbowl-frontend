import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

type ReservationDetails = {
  id: number;
  noOfParticipants: number;
  date: string;
  userName: string;
  reservationItems: ReservationItem[];
};

type ReservationItem = {
  id: number;
  activityName: string;
  price: number;
  startTime: string;
  endTime: string;
};

function BookingConfirmation() {
  const reservationDetails = useLocation().state
    .reservation as ReservationDetails;
  console.log(reservationDetails);

  const activity = useLocation().state.activity as string;
  let activityType = "";
  if (activity === "Bowling") activityType = "Bowling";
  if (activity === "Air Hockey") activityType = "Air Hockey";
  if (activity === "Bowling+Dining") activityType = "Bowling + Middag";
  if (activity === "Air Hockey+Dining") activityType = "Air Hockey + Middag";

  return (
    <>
      {reservationDetails === null ? (
        <div className="flex flex-col justify-center min-h-[400px] bg-gray-100 gap-6 items-center mt-6">
          <h1 className="mt-6 text-4xl text-center">Siden kan ikke vises</h1>
          <Button className="h-10 p-2 w-[200px] ">
            <Link to={"/"}>Gå tilbage til forsiden</Link>
          </Button>
        </div>
      ) : (
        <div className="p-4 px-4 mt-6 bg-gray-100 max-w-[600px] mx-auto">
          <h1 className="text-2xl font-bold text-center">Din reservation</h1>
          <div className="flex flex-col items-center mt-6">
            <p className="mb-2 font-medium">
              Aktivitet: <span className="font-normal">{activityType}</span>
            </p>
            <p className="mb-2 font-medium">
              Dato:{" "}
              <span className="font-normal">{reservationDetails.date}</span>
            </p>
            <p className="mb-2 font-medium">
              Antal deltagere:{" "}
              <span className="font-normal">
                {reservationDetails.noOfParticipants}
              </span>
            </p>
            <div className="mb-2 ">
              <ul className="w-[400px]">
                {reservationDetails.reservationItems.map(item => (
                  <li key={item.id} className="flex w-full my-1 bg-gray-200">
                    <p className="w-[170px]">
                      {item.activityName == "Dining"
                        ? "Middag"
                        : item.activityName}
                    </p>
                    <p className="w-[150px]">
                      kl.
                      {item.startTime.substring(11, 16)} -{" "}
                      {item.endTime.substring(11, 16)}
                    </p>
                    <p className="w-[150px] text-right">
                      {item.price.toFixed(2)} kr.
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-2 font-medium ">
              <div className="w-[400px]">
                <div className="flex justify-between w-full">
                  <p className="text-right">TOTAL</p>
                  <p>
                    {reservationDetails.reservationItems
                      .reduce((acc, item) => acc + item.price, 0)
                      .toFixed(2)}{" "}
                    kr.
                  </p>
                </div>
              </div>
            </div>
            <Button className="h-10 p-2 w-[200px] ">
              <Link to={"/"}>Gå tilbage til forsiden</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingConfirmation;
