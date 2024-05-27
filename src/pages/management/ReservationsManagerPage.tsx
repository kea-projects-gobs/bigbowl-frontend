import { useState } from "react";

import { Button } from "@/components/ui/button";

import { DateRangePicker } from "@/components/DateRangePicker";

import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { AdminReservationsTable } from "./AdminReservationsTable";

function ReservationsManagerPage() {
  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 4),
  });

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 4),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDateRange(date);
  };

  return (
    <div className="max-w-[1080px] mx-auto  rounded">
      <form onSubmit={handleSubmit} className="p-4 px-4 mt-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-center">
          Søg efter reservationer
        </h1>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <DateRangePicker date={date} setDate={setDate} />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button type="submit" className="mt-6 w-[300px]">
            Søg
          </Button>
        </div>
      </form>
      <div className="mt-6">
        <AdminReservationsTable dateRange={dateRange} />
      </div>
    </div>
  );
}

export default ReservationsManagerPage;
