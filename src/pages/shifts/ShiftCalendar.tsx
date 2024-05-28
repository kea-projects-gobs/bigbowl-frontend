import { useState, useEffect } from "react";
import { Shift } from "@/interfaces/interfaces";
import { getShifts, deleteShift } from "@/services/api/api";
import ShiftForm from "./ShiftForm";
import Modal from "@/components/Modal";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ShiftCalendar = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit" | "delete">(
    "create"
  );
  const { toast } = useToast();

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    const response = await getShifts();
    setShifts(response.data);
  };

  const handleDayClick = (date: Date) => {
    // Set the time to midnight to avoid time zone issues
    const adjustedDate = new Date(date);
    adjustedDate.setHours(0, 0, 0, 0);
    setSelectedDate(adjustedDate);
    setSelectedShift(null);
    // Måske pas på her, da den fetcher hver gang vi skifter dato på kalenderen (men sikrer at dataen er opdateret)
    fetchShifts();
    console.log(adjustedDate);
  };

  const openModal = (type: "create" | "edit" | "delete", shift?: Shift) => {
    setModalType(type);
    setSelectedShift(shift || null);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    await fetchShifts();
    setSelectedShift(null);
    setIsModalOpen(false);
    toast({
      title: modalType === "create" ? "Vagt oprettet" : "Vagt opdateret",
      description:
        modalType === "create"
          ? "Vagten er nu oprettet"
          : "Vagten er nu opdateret",
      variant: "default",
    });
  };

  const handleDelete = async () => {
    if (selectedShift && selectedShift.id) {
      await deleteShift(selectedShift.id);
      fetchShifts();
      setIsModalOpen(false);
      toast({
        title: "Vagt slettet",
        description: `Vagt er slettet for ${
          selectedShift.employee
        }: ${formatTime(selectedShift.startTime)} - ${formatTime(
          selectedShift.endTime
        )}`,
        variant: "destructive",
      });
    }
  };

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const shiftsForSelectedDate = selectedDate
    ? shifts.filter(
        shift =>
          new Date(shift.date).toDateString() === selectedDate.toDateString()
      )
    : [];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-2 border-2">
        <Calendar
          onDayClick={handleDayClick}
          className="flex items-center justify-center"
        />
      </div>
      <div className="p-2 border-2 md:w-3/4">
        <h2 className="text-lg font-bold">
          Vagter for{" "}
          {selectedDate?.toLocaleDateString("da-DK", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <ul className="mt-6">
          {shiftsForSelectedDate.map(shift => (
            <li
              key={shift.id}
              className="flex items-center justify-between px-4 py-2 mt-2 bg-white rounded-lg shadow"
            >
              <span className="mx-2 font-medium text-gray-800">
                <div>
                  <strong>Tidspunkt:</strong> {formatTime(shift.startTime)} -{" "}
                  {formatTime(shift.endTime)}
                </div>
                <div>
                  <strong>Medarbejder:</strong> {shift.employee}
                </div>
              </span>
              <div className="flex items-center justify-center">
                <Button
                  onClick={() => openModal("edit", shift)}
                  variant="secondary"
                  className="px-3 py-1 mr-2 rounded hover:bg-gray-200"
                >
                  Rediger
                </Button>
                <Button
                  onClick={() => openModal("delete", shift)}
                  variant="secondary"
                  className="px-3 py-1 rounded hover:bg-gray-200"
                >
                  Slet
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => openModal("create")}
          className="w-full px-4 py-2 mt-4"
        >
          Opret ny vagt
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${
          modalType.charAt(0).toUpperCase() + modalType.slice(1)
        } Shift`}
      >
        {modalType !== "delete" ? (
          <ShiftForm
            shift={selectedShift}
            selectedDate={selectedDate}
            onSave={handleSave}
            modalType={modalType}
          />
        ) : (
          <div>
            <p className="mb-4 text-lg">
              Er du sikker på, at du vil slette denne vagt?
            </p>
            <div className="p-4 bg-gray-100 rounded-lg">
              <span className="text-black">
                {new Date(selectedShift?.date ?? "").toLocaleDateString(
                  "da-DK",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </span>

              <p className="text-gray-800">
                {formatTime(selectedShift?.startTime ?? "")} -{" "}
                {formatTime(selectedShift?.endTime ?? "")}
              </p>
              <p className="text-gray-800">{selectedShift?.employee}</p>
            </div>
            <div className="flex items-center justify-end p-4 mt-4 border-t border-gray-200">
              <Button
                onClick={handleDelete}
                variant="destructive"
                className="px-4 py-2 rounded-l"
              >
                Ja, slet
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="secondary"
                className="px-4 py-2 ml-2 rounded-r hover:bg-gray-200"
              >
                Nej, gå tilbage
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ShiftCalendar;
