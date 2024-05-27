import { useState, useEffect } from "react";
import { Shift } from "@/interfaces/interfaces";
import { Username } from "@/interfaces/interfaces";
import InputField from "@/components/InputField";
import { createShift, updateShift } from "@/services/api/api";
import { Button } from "@/components/ui/button";
import { getUsernames } from "@/services/api/api";

interface ShiftFormProps {
  shift: Shift | null;
  selectedDate: Date | null;
  onSave: () => void;
  modalType: "create" | "edit";
}

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const ShiftForm: React.FC<ShiftFormProps> = ({ shift, selectedDate, onSave, modalType }) => {
    const [formData, setFormData] = useState<Shift>({
        id: shift?.id || undefined,
        date: shift?.date || (selectedDate ? formatDate(selectedDate) : ''),
        startTime: shift?.startTime || '',
        endTime: shift?.endTime || '',
        employee: shift?.employee || ''
    });
    const [usernames, setUsernames] = useState<Username[]>([]);
    //const [selectedUsername, setSelectedUsername] = useState<Username | null>(null);

  useEffect(() => {
    if (shift) {
      setFormData(shift);
    } else if (selectedDate) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: formatDate(selectedDate)
      }));
    }
  }, [shift, selectedDate]);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await getUsernames();
        setUsernames(response.data.map((username: string) => ({ username })));
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };

    fetchUsernames();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, employee: value });
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
      <InputField label="Dato" name="date" type="date" value={formData.date} onChange={handleChange} required />
      <InputField label="Start Tid" name="startTime" type="time" value={formData.startTime} onChange={handleChange} required />
      <InputField label="Slut Tid" name="endTime" type="time" value={formData.endTime} onChange={handleChange} required />
      <div>
              <label>Medarbejder</label>
              <select
                id="employee"
                name="employee"
                value={formData.employee}
                onChange={handleEmployeeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Vælg en medarbejder</option>
                {usernames.map(user => (
                  <option key={user.username} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
      <Button type="submit" className="mt-4 py-2 px-4 rounded">
        {modalType === "create" ? "Create Shift" : "Save Changes"}
      </Button>
    </form>
  );
};

export default ShiftForm;
