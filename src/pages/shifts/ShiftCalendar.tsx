import { useState, useEffect } from "react";
import { Shift } from "@/interfaces/interfaces";
import { getShifts, deleteShift } from "@/services/api/api";
import ShiftForm from "./ShiftForm";
import Modal from "@/components/Modal";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const ShiftCalendar = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); 
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit" | "delete">("create");

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
  };

  const handleDelete = async () => {
    if (selectedShift && selectedShift.id) {
      await deleteShift(selectedShift.id);
      fetchShifts();
      setIsModalOpen(false);
    }
  };

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const shiftsForSelectedDate = selectedDate ? shifts.filter((shift) => new Date(shift.date).toDateString() === selectedDate.toDateString()) : [];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="border-2 p-2">
          <Calendar onDayClick={handleDayClick} />

      </div>
      <div className="md:w-3/4 p-2 border-2">
        <h2 className="font-bold text-lg">Vagter for {selectedDate?.toLocaleDateString("da-DK", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</h2>
        <ul className="mt-6">
          {shiftsForSelectedDate.map((shift) => (
            <li key={shift.id} className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-lg mt-2">
              <span className="font-medium text-gray-800">
                <div>
                  <strong>Tidspunkt:</strong> {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                </div>
                <div>
                  <strong>Medarbejder:</strong> {shift.employee}
                </div>
              </span>
              <div>
                <Button onClick={() => openModal("edit", shift)} variant="secondary" className="py-1 px-3 rounded mr-2 hover:bg-gray-200">
                  Rediger
                </Button>
                <Button onClick={() => openModal("delete", shift)} variant="secondary" className="py-1 px-3 rounded hover:bg-gray-200">
                  Slet
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Button onClick={() => openModal("create")} className="mt-4 px-4 py-2 w-full">
          Opret ny vagt
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Shift`}>
        {modalType !== "delete" ? (
          <ShiftForm shift={selectedShift} selectedDate={selectedDate} onSave={handleSave} modalType={modalType} />
        ) : (
          <div>
            <p className="text-lg mb-4">Er du sikker på, at du vil slette denne vagt?</p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <span className="text-black">
                {new Date(selectedShift?.date ?? "").toLocaleDateString("da-DK", { year: "numeric", month: "long", day: "numeric" })}
              </span>

              <p className="text-gray-800">
                {formatTime(selectedShift?.startTime ?? "")} - {formatTime(selectedShift?.endTime ?? "")}
              </p>
              <p className="text-gray-800">{selectedShift?.employee}</p>
            </div>
            <div className="flex justify-end items-center p-4 mt-4 border-t border-gray-200">
              <Button onClick={handleDelete} variant="destructive" className="py-2 px-4 rounded-l">
                Ja, slet
              </Button>
              <Button onClick={() => setIsModalOpen(false)} variant="secondary" className="py-2 px-4 rounded-r ml-2 hover:bg-gray-200">
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
