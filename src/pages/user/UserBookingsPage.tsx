import { BookingsTable } from "./BookingsTable";

function UserBookingsPage() {
  return (
    <div className="mt-6 max-w-[700px] flex flex-col mx-auto">
      <h1 className="mb-4 text-3xl font-semibold text-center">
        Dine bookinger
      </h1>
      <BookingsTable />
    </div>
  );
}

export default UserBookingsPage;
