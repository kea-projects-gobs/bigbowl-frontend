import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DeleteBooking } from "./DeleteBooking";
import { useEffect, useState } from "react";
import { getAllReservations } from "@/services/api/api";
import { cn } from "@/lib/utils";

// JSON ORDERS
// {
//         "id": 1,
//         "noOfParticipants": 8,
//         "date": "2024-05-28",
//         "userName": "Johnersej123",
//         "reservationItems": [
//             {
//                 "id": 1,
//                 "activityName": "Bowling Lane 1",
//                 "price": 100.0,
//                 "startTime": "2024-05-28T10:00:00",
//                 "endTime": "2024-05-28T11:00:00"
//             },
//             {
//                 "id": 2,
//                 "activityName": "Bowling Lane 2",
//                 "price": 100.0,
//                 "startTime": "2024-05-28T10:00:00",
//                 "endTime": "2024-05-28T11:00:00"
//             }
//         ],
//         "confirmed": false
//     }

type Item = {
  id: number;
  activityName: string;
  price: number;
  startTime: string;
  endTime: string;
};

type Order = {
  id: number;
  noOfParticipants: number;
  date: string;
  userName: string;
  reservationItems: Item[];
  confirmed: boolean;
};

export function BookingsTable() {
  const [orders, setOrders] = useState<Order[]>([]);

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

  return (
    <Table>
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
              <DeleteBooking />
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
