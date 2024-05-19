import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { da } from "date-fns/locale";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [activity, setActivity] = useState<"bowling" | "airhockey" | "dining">(
    "bowling"
  );
  const [participants, setParticipants] = useState<number>(1);
  const [time, setTime] = useState<string>("10:00");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const maxParticipants = {
    bowling: 24,
    airhockey: 12,
    dining: 24,
  };

  const openingHours = {
    open: "10:00",
    close: "22:00",
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);

    if (!date) {
      setIsError(true);
      setErrorMessage("Vælg en dato");
      return;
    }

    console.log("Form submitted");

    setIsError(false);

    console.log({
      date: date,
      activity: activity,
      participants: participants,
      time: time,
    });
  };

  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    if (isNaN(value)) return setParticipants(1);
    if (value < 1 || value > maxParticipants[activity]) {
      setParticipants(maxParticipants[activity]);
    } else {
      setParticipants(value);
    }
  };

  const handleSelectedDate = (e: Date | Date[] | undefined) => {
    if (e === undefined) return;
    (e as Date).setHours(23);
    (e as Date).setMinutes(59);
    console.log(e);

    if ((e as Date) >= new Date()) setDate(e as Date);
  };

  useEffect(() => {
    if (maxParticipants[activity] < participants) {
      setParticipants(maxParticipants[activity]);
    }
  }, [activity]);

  return (
    <div className="max-w-[400px] mx-auto bg-gray-100 mt-6 p-4 rounded">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center px-4">
          <h1 className="text-2xl font-bold text-center">Reservér</h1>
          <div className="mt-4">
            <p className="mb-2 font-medium">Dato</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
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
          <div className="mt-4">
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
          </div>
          <div className="mt-4">
            <p className="mb-2 font-medium">
              Antal deltagere{" "}
              <span className="font-light text-[14px]">
                (Max{" "}
                <span className="font-medium text-[14px]">
                  {maxParticipants[activity]}
                </span>{" "}
                deltagere)
              </span>
            </p>
            <Input
              className="bg-white"
              type="number"
              min={1}
              max={24}
              value={participants}
              onChange={handleParticipantsChange}
              placeholder="Antal deltagere"
            />
          </div>
          <div className="mt-4">
            <p className="mb-2 font-medium">
              Start tidspunkt{" "}
              <span className="font-light text-[14px]">
                (åbent {openingHours["open"]} - {openingHours["close"]})
              </span>
            </p>
            <Input
              className="bg-white"
              type="time"
              min={openingHours["open"]}
              max={openingHours["close"]}
              step="3600"
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="Antal deltagere"
            />
          </div>
          <Button type="submit" className="mt-4">
            Videre
          </Button>
          <div className="mt-4 font-medium text-center text-red-600">
            {isError && <p>{errorMessage}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}
