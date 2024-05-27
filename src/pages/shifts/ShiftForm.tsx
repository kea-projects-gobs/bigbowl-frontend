import { useState, useEffect } from "react";
import { Shift } from "@/interfaces/interfaces";
import InputField from "@/components/InputField";
import { createShift, updateShift } from "@/services/api/api";
import { Button } from "@/components/ui/button";

interface ShiftFormProps {
  shift: Shift | null;
  selectedDate: Date | null;
  onSave: () => void;
  modalType: "create" | "edit";
}

const ShiftForm: React.FC<ShiftFormProps> = ({ shift, selectedDate, onSave, modalType }) => {
  const [formData, setFormData] = useState<Shift>({
    id: shift?.id || undefined,
    date: shift?.date || (selectedDate ? selectedDate.toISOString().split("T")[0] : ""),
    startTime: shift?.startTime || "",
    endTime: shift?.endTime || "",
    employee: shift?.employee || "",
  });

  useEffect(() => {
    if (shift) {
      setFormData(shift);
    } else if (selectedDate) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: selectedDate.toISOString().split("T")[0],
      }));
    }
  }, [shift, selectedDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "edit" && formData.id) {
      await updateShift(formData.id, formData);
    } else if (modalType === "create") {
      await createShift(formData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
      <InputField label="Start Time" name="startTime" type="time" value={formData.startTime} onChange={handleChange} required />
      <InputField label="End Time" name="endTime" type="time" value={formData.endTime} onChange={handleChange} required />
      <InputField label="Employee" name="employee" value={formData.employee} onChange={handleChange} required />
      <Button type="submit" className="mt-4 py-2 px-4 rounded">
        {modalType === "create" ? "Create Shift" : "Save Changes"}
      </Button>
    </form>
  );
};

export default ShiftForm;
