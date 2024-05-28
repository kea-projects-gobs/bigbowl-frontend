import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DeleteBooking } from "./DeleteBooking";
import { useEffect, useState } from "react";
import { deleteReservation, getAllReservations } from "@/services/api/api";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Item, Order } from "@/interfaces/types";

export function BookingsTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getAllReservations();
      if (res.status === 200) {
        setOrders(res.data);
      } else {
        console.log("Failed to fetch orders:", res.status);
      }
    };

    fetchOrders();
  }, []);

  const getActivities = (items: Item[]) => {
    function onlyUnique(value: string, index: number, array: string[]) {
      return array.indexOf(value) === index;
    }

    const activityNames = items.map(item => item.activityName);
    const listOfActivities = [];
    for (let i = 0; i < activityNames.length; i++) {
      const activity = activityNames[i].split(" ");
      if (activity.includes("Bowling")) {
        listOfActivities.push("Bowling");
      }
      if (activity.includes("Dining")) {
        listOfActivities.push("Middag");
      }
      if (activity.includes("Air")) {
        listOfActivities.push("Air Hockey");
      }
    }
    return listOfActivities.filter(onlyUnique).join(", ");
  };

  const getTotalPrice = (orders: Order[]) => {
    return orders.reduce(
      (acc, order) =>
        order.reservationItems.reduce((acc, item) => item.price + acc, 0) + acc,
      0
    );
  };

  const handleDeleteReservation = async (id: number) => {
    await deleteReservation(id);
    const res = await getAllReservations();
    if (res.status === 200) {
      setOrders(res.data);
      toast({
        title: "Reservation slettet",
        description: "Reservationen er blevet slettet.",
        variant: "default",
        className: "bg-green-500 text-white",
      });
    } else {
      console.log("Failed to fetch orders:", res.status);
    }
  };

  return (
    <Table>
      <TableCaption>
        Det er muligt at slette reservationer senest 24 timer før reservations
        start.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Ordrenr</TableHead>
          <TableHead className="w-[100px]">Dato</TableHead>
          <TableHead className="w-[150px]">Status</TableHead>
          <TableHead className="w-[200px]">Aktivitet</TableHead>
          <TableHead className="text-right w-[200px]">Beløb</TableHead>
          <TableHead className="text-right w-[60px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>
              {order.reservationItems[0].startTime.substring(0, 10)}
            </TableCell>
            <TableCell
              className={cn(
                order.confirmed ? "text-green-500" : "text-red-500"
              )}
            >
              {order.confirmed ? "Bekræftet" : "Ikke bekræftet"}
            </TableCell>
            <TableCell>{getActivities(order.reservationItems)}</TableCell>
            <TableCell className="text-right">
              {order.reservationItems.reduce(
                (acc, item) => item.price + acc,
                0
              )}
              ,00 kr.
            </TableCell>
            <TableCell>
              {new Date(order.reservationItems[0].startTime).getTime() -
                new Date().getTime() >
                86400000 && (
                <DeleteBooking
                  id={order.id}
                  handleDeleteReservation={handleDeleteReservation}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            {getTotalPrice(orders)},00 kr.{" "}
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
