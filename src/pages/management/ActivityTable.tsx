import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Activity } from "@/interfaces/types";
import { cn } from "@/lib/utils";
import { getAllActivities, toggleActivityStatus } from "@/services/api/api";
import { useEffect, useState } from "react";

export function ActivityTable() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getAllActivities();
      if (res.status === 200) {
        setActivities(res.data);
      } else {
        console.log("Failed to fetch activities:", res.status);
      }
    };

    fetchOrders();
  }, []);

  const handleStatus = async (activity: Activity) => {
    try {
      const res = await toggleActivityStatus(activity.id, !activity.active);
      if (res.status === 200) {
        const updatedActivities = activities.map(act =>
          act.id === activity.id ? { ...act, active: !act.active } : act
        );
        setActivities(updatedActivities);
        toast({
          title: "Aktivitets status ændret",
          description:
            "Aktivitets status er nu ændret til " +
            (activity.active ? "Ikke tilgængelig" : "Tilgængelig"),
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
    } catch (error) {
      toast({
        title: "Fejl!",
        description: "Opdatering af ordrestatus fejlede. Prøv igen.",
        variant: "default",
        className: "bg-red-500 text-white",
      });
    }
  };

  const formatLocationText = (location: string) => {
    if (location.includes("Lane")) {
      return location.replace("Lane", "Bane");
    }
    if (location.includes("Table")) {
      return location.replace("Table", "Bord");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Aktivitet</TableHead>
          <TableHead>Bane/bord</TableHead>
          <TableHead>Max antal deltagere</TableHead>
          <TableHead>Børnevenlig</TableHead>
          <TableHead>Pris</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map(activity => (
          <TableRow key={activity.id}>
            <TableCell>{activity.activityType}</TableCell>
            <TableCell>{formatLocationText(activity.location)}</TableCell>
            <TableCell>{activity.maxParticipants}</TableCell>
            <TableCell>{activity.childFriendly ? "Ja" : "Nej"}</TableCell>
            <TableCell>{activity.price},00 kr.</TableCell>
            <TableCell
            // className={cn(
            //   activity.active ? "text-green-500" : "text-red-500"
            // )}
            >
              <button
                onClick={() => handleStatus(activity)}
                className="hover:cursor-pointer"
              >
                <Badge
                  className={cn(
                    activity.active ? "bg-green-500" : "bg-red-500",
                    "min-w-[110px] flex justify-center"
                  )}
                >
                  {activity.active ? "Tilgængelig" : "Ikke tilgængelig"}
                </Badge>
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
