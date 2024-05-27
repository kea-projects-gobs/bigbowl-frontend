import { useState, useEffect } from "react";
import { Shift } from "@/interfaces/interfaces";
import { getShifts, deleteShift } from "@/services/api/api";
import ShiftForm from "./ShiftForm";
import Modal from "@/components/Modal";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const ShiftCalendar = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
    setSelectedDate(date);
    setSelectedShift(null);
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

  const shiftsForSelectedDate = selectedDate ? shifts.filter((shift) => new Date(shift.date).toDateString() === selectedDate.toDateString()) : [];

  return (
    <div className="flex">
      <div className="w-1/2">
        <h1>Shift Management</h1>
        <Calendar onDayClick={handleDayClick} />
      </div>
      <div className="w-1/2">
        <h2>Shifts for {selectedDate?.toDateString()}</h2>
        <Button onClick={() => openModal("create")} className="mt-4 px-4 py-2">
          Create New Shift
        </Button>
        <ul className="mt-6">
          {shiftsForSelectedDate.map((shift) => (
            <li key={shift.id} className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-lg mt-2">
              <span className="font-medium text-gray-800">
                {shift.startTime} - {shift.endTime}
                <p>{shift.employee}</p>
              </span>
              <div>
                <Button onClick={() => openModal("edit", shift)} variant="secondary" className="py-1 px-3 rounded mr-2 hover:bg-gray-200">
                  Edit
                </Button>
                <Button onClick={() => openModal("delete", shift)} variant="secondary" className="py-1 px-3 rounded hover:bg-gray-200">
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Shift`}>
        {modalType !== "delete" ? (
          <ShiftForm shift={selectedShift} selectedDate={selectedDate} onSave={handleSave} modalType={modalType} />
        ) : (
          <div>
            <p className="text-lg mb-4">Are you sure you want to delete this shift?</p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-gray-800 font-semibold">
                <span className="text-blue-600">{selectedShift?.employee}</span>
              </h2>
            </div>
            <div className="flex justify-end items-center p-4 mt-4 border-t border-gray-200">
              <Button onClick={handleDelete} variant="destructive" className="py-2 px-4 rounded-l">
                Yes, delete
              </Button>
              <Button onClick={() => setIsModalOpen(false)} variant="secondary" className="py-2 px-4 rounded-r ml-2 hover:bg-gray-200">
                No, go back
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ShiftCalendar;
