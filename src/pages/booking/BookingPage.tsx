import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { da } from "date-fns/locale";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Dropdown from "@/components/ui/dropdown";

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [activity, setActivity] = useState<"bowling" | "airhockey" | "dining">(
    "bowling"
  );
  const [noOfAdults, setNoOfAdults] = useState<number>(1);
  const [noOfChildren, setNoOfChildren] = useState<number>(1);
  const [time, setTime] = useState<string>("10:00");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const maxParticipants = {
    bowling: 24,
    airhockey: 12,
    dining: 24,
  };

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
    "20:00",
    "21:00",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);

    if (!date) {
      setIsError(true);
      setErrorMessage("Vælg en dato");
      return;
    }

    if (noOfAdults + noOfChildren > maxParticipants[activity]) {
      setIsError(true);
      setErrorMessage(
        "Antal deltagere må ikke overstige " + maxParticipants[activity]
      );
      return;
    }

    console.log("Form submitted");

    setIsError(false);

    console.log({
      date: date,
      activity: activity,
      noOfAdults: noOfAdults,
      noOfChildren: noOfChildren,
      time: time,
    });
  };

  const handleNoOfAdultsChange = (e: string) => {
    const value = e ? parseInt(e) : 1;
    if (isNaN(value)) return setNoOfAdults(1);
    if (value < 1 || value > maxParticipants[activity]) {
      setNoOfAdults(maxParticipants[activity]);
    } else {
      setNoOfAdults(value);
    }
  };

  const handleNoOfChildrenChange = (e: string) => {
    const value = e ? parseInt(e) : 1;
    if (isNaN(value)) return setNoOfChildren(1);
    if (value < 1 || value > maxParticipants[activity]) {
      setNoOfChildren(maxParticipants[activity]);
    } else {
      setNoOfChildren(value);
    }
  };

  const handleActivityChange = (value: string) => {
    setActivity(value as "bowling" | "airhockey" | "dining");
  };

  const handleSelectedDate = (e: Date | Date[] | undefined) => {
    if (e === undefined) return;
    (e as Date).setHours(23);
    (e as Date).setMinutes(59);
    console.log(e);

    if ((e as Date) >= new Date()) setDate(e as Date);
  };

  return (
    <div className="max-w-[1080px] mx-auto bg-gray-100 mt-6 p-4 rounded">
      <form onSubmit={handleSubmit} className="px-4">
        <h1 className="text-2xl font-bold text-center">Reservér</h1>
        <div className="flex flex-wrap justify-between gap-2 mt-4">
          <div>
            <p className="mb-2 font-medium">Dato</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[170px] justify-start text-left font-normal",
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
              className="w-[170px]"
              options={hours}
              onSelect={setTime}
              defaultText="Vælg start tidspunkt"
            />
          </div>
          {/* <div className="mt-4">
            <p className="mb-2 font-medium">Aktivitet</p>
            <RadioGroup
              defaultValue={activity}
              onValueChange={value =>
                setActivity(value as "bowling" | "airhockey" | "dining")
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="bg-white" value="bowling" id="r1" />
                <Label htmlFor="r1">Bowling</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="bg-white"
                  value="airhockey"
                  id="r2"
                />
                <Label htmlFor="r2">Air hockey</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="bg-white" value="dining" id="r3" />
                <Label htmlFor="r3">Middag</Label>
              </div>
            </RadioGroup>
          </div> */}
          <div>
            <p className="mb-2 font-medium">Voksne</p>
            <Dropdown
              className="w-[170px]"
              options={Array.from({ length: 25 }, (_, i) => i.toString())}
              onSelect={handleNoOfAdultsChange}
              defaultText="Vælg antal voksne"
            />
          </div>
          <div>
            <p className="mb-2 font-medium">Børn</p>
            <Dropdown
              className="w-[170px]"
              options={Array.from({ length: 25 }, (_, i) => i.toString())}
              onSelect={handleNoOfChildrenChange}
              defaultText="Vælg antal børn"
            />
          </div>
          <div>
            <p className="mb-2 font-medium">Aktivitet</p>
            <Dropdown
              className="w-[170px]"
              options={["Bowling", "Airhockey", "Dining"]}
              onSelect={handleActivityChange}
              defaultText="Vælg aktivitet"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button type="submit" className="mt-6 min-w-[180px]">
            Søg efter ledige tider
          </Button>
        </div>
        <div className="flex flex-col justify-center">
          <div className="font-medium text-center text-red-600">
            {isError && <p className="mt-2">{errorMessage}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}
