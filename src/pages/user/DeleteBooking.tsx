import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "@radix-ui/react-icons";

type DeleteBookingProps = {
  handleDeleteReservation: (id: number) => void;
  id: number;
};

export function DeleteBooking(props: DeleteBookingProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button>
          <TrashIcon className="w-[18px] h-[18px] cursor-pointer hover:text-red-500" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Er du sikker på at du vil annullere din booking?
          </AlertDialogTitle>
          {/* <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Fortryd</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => props.handleDeleteReservation(props.id)}
          >
            Slet booking
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
