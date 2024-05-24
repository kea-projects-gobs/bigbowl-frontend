import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { da } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Dropdown from "@/components/ui/dropdown";
import ActivityCard from "@/components/ActivityCard";
import { useNavigate } from "react-router-dom";
import { Reservation } from "@/interfaces/types";
import { getAvailableActivities } from "@/services/api/api";

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [activity, setActivity] = useState<
    "Bowling" | "Air Hockey" | "Bowling+Dining" | "Air Hockey+Dining"
  >("Bowling");
  const [noOfAdults, setNoOfAdults] = useState<number>(1);
  const [noOfChildren, setNoOfChildren] = useState<number>(1);
  const [time, setTime] = useState<string>("10:00");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [reservation, setReservation] = useState<Reservation[] | null>(null);

  const [tempReservationId, setTempReservationId] = useState<string>("");

  const navigate = useNavigate();

  const hours = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setTempReservationId("");

    if (!date) {
      setIsError(true);
      setErrorMessage("Vælg en dato");
      return;
    }

    setIsError(false);

    const newDate = new Date(date as Date);
    newDate.setHours(parseInt(time.split(":")[0]));
    newDate.setMinutes(parseInt(time.split(":")[1]));
    setDate(newDate);

    const res = await getAvailableActivities({
      date: newDate,
      activityType: activity,
      noOfAdults: noOfAdults,
      noOfChildren: noOfChildren,
      startTime: time,
    });

    if (res.status == 200) {
      setReservation(res.data);
    } else {
      console.log("Error");
    }
  };

  const handleNoOfAdultsChange = (e: string) => {
    const value = e ? parseInt(e) : 1;
    setNoOfAdults(value);
  };

  const handleNoOfChildrenChange = (e: string) => {
    const value = e ? parseInt(e) : 1;
    setNoOfChildren(value);
  };

  const handleActivityChange = (value: string) => {
    if (value === "Bowling") setActivity("Bowling");
    if (value === "Air Hockey") setActivity("Air Hockey");
    if (value === "Bowling + Middag") setActivity("Bowling+Dining");
    if (value === "Air Hockey + Middag") setActivity("Air Hockey+Dining");
  };

  const handleSelectedDate = (e: Date | Date[] | undefined) => {
    if (e === undefined) return;
    (e as Date).setHours(23);
    (e as Date).setMinutes(59);
    console.log(e);

    if ((e as Date) >= new Date()) setDate(e as Date);
  };

  const handleAddToCart = (reservation: Reservation) => {
    console.log(reservation);
    if (reservation.tempReservationId === tempReservationId) {
      setTempReservationId("");
      localStorage.removeItem("reservation");
      return;
    }
    setTempReservationId(reservation.tempReservationId);
    localStorage.setItem("reservation", JSON.stringify(reservation));
  };

  const navigateToReservationDetailsPage = async () => {
    const reservation = JSON.parse(
      localStorage.getItem("reservation") as string
    );
    console.log(reservation);

    navigate("/login", {
      state: { from: location.pathname + "/" + tempReservationId },
    });
  };

  return (
    <div className="max-w-[1080px] mx-auto  rounded">
      <form onSubmit={handleSubmit} className="p-4 px-4 mt-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-center">Reservér</h1>
        <div className="flex flex-wrap justify-center gap-2 mt-4 sm:justify-between">
          <div>
            <p className="mb-2 font-medium">Dato</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[300px] sm:w-[170px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {date ? (
                    format(date, "PPP", { locale: da })
                  ) : (
                    <span>Vælg en dato</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleSelectedDate}
                  locale={da}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <p className="mb-2 font-medium">
              Start tidspunkt{" "}
              {/* <span className="font-light text-[14px]">
                (åbent {openingHours["open"]} - {openingHours["close"]})
              </span> */}
            </p>
            <Dropdown
              className="w-[300px] sm:w-[170px]"
              options={hours}
              onSelect={setTime}
              defaultText="Vælg start tidspunkt"
            />
          </div>
          <div>
            <p className="mb-2 font-medium">Voksne</p>
            <Dropdown
              className="w-[300px] sm:w-[170px]"
              options={Array.from({ length: 25 }, (_, i) => i.toString())}
              onSelect={handleNoOfAdultsChange}
              defaultText="Vælg antal voksne"
            />
          </div>
          <div>
            <p className="mb-2 font-medium">Børn</p>
            <Dropdown
              className="w-[300px] sm:w-[170px]"
              options={Array.from({ length: 25 }, (_, i) => i.toString())}
              onSelect={handleNoOfChildrenChange}
              defaultText="Vælg antal børn"
            />
          </div>
          <div>
            <p className="mb-2 font-medium">Aktivitet</p>
            <Dropdown
              className="w-[300px] sm:w-[170px]"
              options={[
                "Bowling",
                "Air Hockey",
                "Bowling + Middag",
                "Air Hockey + Middag",
              ]}
              onSelect={handleActivityChange}
              defaultText="Vælg aktivitet"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button type="submit" className="mt-6 w-[300px] sm:w-[170px]">
            Søg efter ledige tider
          </Button>
        </div>
        <div className="flex flex-col justify-center">
          <div className="font-medium text-center text-red-600">
            {isError && <p className="mt-2">{errorMessage}</p>}
          </div>
        </div>
      </form>
      <section className="flex flex-wrap justify-center gap-2 mt-10">
        {reservation && reservation.length > 0 ? (
          reservation.map(res => (
            <ActivityCard
              choosen={res.tempReservationId === tempReservationId}
              key={res.tempReservationId}
              reservation={res}
              handleAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="text-center">Ingen ledige tider</p>
        )}
      </section>
      <div className="flex justify-center">
        {tempReservationId !== "" && (
          <Button
            onClick={navigateToReservationDetailsPage}
            className="mt-6 w-full sm:w-[170px]"
          >
            Videre
          </Button>
        )}
      </div>
    </div>
  );
}
