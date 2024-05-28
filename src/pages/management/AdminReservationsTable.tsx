import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Item, Order } from "@/interfaces/types";
import { cn } from "@/lib/utils";
import {
  deleteReservation,
  getAllReservations,
  toggleReservationStatus,
} from "@/services/api/api";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { DeleteBooking } from "../user/DeleteBooking";

type AdminReservationsTableProps = {
  dateRange: DateRange | undefined;
};

export function AdminReservationsTable(props: AdminReservationsTableProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

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

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getAllReservations(
        props?.dateRange?.from,
        props?.dateRange?.to
      );
      if (res.status === 200) {
        setOrders(res.data);
      } else {
        console.log("Failed to fetch orders:", res.status);
      }
    };

    fetchOrders();
  }, [props?.dateRange]);

  const handleStatus = async (order: Order) => {
    console.log(
      "Status changed for id = " + order.id + " to " + !order.confirmed
    );

    const res = await toggleReservationStatus(order.id, !order.confirmed);
    if (res.status === 200) {
      const updatedOrders = orders.map(o =>
        o.id === order.id ? { ...o, confirmed: !o.confirmed } : o
      );
      setOrders(updatedOrders);
      toast({
        title: "Ordrestatus ændret",
        description:
          "Ordrestatus er nu ændret til " +
          (order.confirmed ? "Ikke bekræftet" : "Bekræftet"),
        variant: "default",
        className: "bg-green-500 text-white",
      });
    } else {
      toast({
        title: "Fejl!",
        description: "Opdatering af ordrestatus fejlede. Prøv igen.",
        variant: "default",
        className: "bg-red-500 text-white",
      });
    }
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
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Ordrenr</TableHead>
          <TableHead className="w-[100px]">Dato</TableHead>
          <TableHead className="w-[150px]">Status</TableHead>
          <TableHead className="w-[200px]">Aktivitet</TableHead>
          <TableHead className="w-[200px]">Bruger</TableHead>
          <TableHead className="w-[200px]">Antal deltagere</TableHead>

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
              <button
                onClick={() => handleStatus(order)}
                className="hover:cursor-pointer"
              >
                {order.confirmed ? "Bekræftet" : "Ikke bekræftet"}
              </button>
            </TableCell>
            <TableCell>{getActivities(order.reservationItems)}</TableCell>
            <TableCell>{order.userName}</TableCell>
            <TableCell>{order.noOfParticipants}</TableCell>
            <TableCell className="text-right">
              {order.reservationItems.reduce(
                (acc, item) => item.price + acc,
                0
              )}
              ,00 kr.
            </TableCell>
            <TableCell>
              <DeleteBooking
                id={order.id}
                handleDeleteReservation={handleDeleteReservation}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total</TableCell>
          <TableCell className="text-right">
            {getTotalPrice(orders)},00 kr.{" "}
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
