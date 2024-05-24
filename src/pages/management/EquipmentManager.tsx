import { useEffect, useState } from "react";
import { getEquipment, orderReplacements } from "../../services/api/api";
import { Equipment } from "../../interfaces/interfaces";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function EquipmentManager() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const { toast } = useToast();
  //const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    const response = await getEquipment();
    console.log(response.data);
    
    setEquipment(response.data);
  };

  const orderEquipment = async (equipmentName: string) => {
    try {
      const response = await orderReplacements(equipmentName);
      const message = response.data;
  
      console.log("Order response:", message);
  
      if (message.includes("Bestilt")) {
        toast({
          title: "Ordre sendt",
          description: message,
          variant: "default",
          className: "bg-green-500"
        });
      } else if (message.includes("nok")) {
        toast({
          title: "Ingen ordre nødvendig",
          description: message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Ukendt svar",
          description: message,
          variant: "default",
        });
      }
  
      fetchEquipment(); // Refresh the equipment list
    } catch (error) {
      console.error("Error ordering equipment:", error);
      toast({
        title: "Fejl i anmodning",
        variant: "destructive",
      });
    }
  };


  return (
    <div>
      <h1 className="text-3xl font-bold leading-tight text-gray-900">
        Administration
      </h1>

      <ul className="mt-6">
        {equipment.map(equipment => (
          <li
            key={equipment.id}
            className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-lg mt-2"
          >
            <span className="font-medium text-gray-800">
                Antal {equipment.name.toLowerCase()}: {equipment.stock}
            </span>
            <div>
              <Button
                variant="secondary"
                className={`py-1 px-3 rounded mr-2 ${equipment.requiredAmount && equipment.requiredAmount > 0 ? "bg-red-500 text-white hover:bg-red-200" : "hover:bg-gray-200"}`}
                onClick={() => orderEquipment(equipment.name)}
              >
                {equipment.requiredAmount && equipment.requiredAmount > 0 ? `Bestil (${equipment.requiredAmount} nye)` : "Nok på lager"}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
