import { useState } from "react";
import { ProductManager } from "./ProductsManager";
import { EquipmentManager } from "./EquipmentManager";
import ShiftCalendar from "../shifts/ShiftCalendar";
import { useAuth } from "../../context/AuthProvider";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const auth = useAuth();

  // Determine the initial tab, based on role
  const getInitialTab = (): "products" | "equipment" | "shifts" => {
    if (auth?.isLoggedInAs(["SALE"])) {
      return "products"; // Default tab for SALE
    } else if (auth?.isLoggedInAs(["OPERATOR"])) {
      return "equipment"; // Default tab for OPERATOR
    } else if (auth?.isLoggedInAs(["EMPLOYEE"])) {
      return "products"; // Default tab for EMPLOYEE
    } else if (auth?.isLoggedInAs(["MANAGER"])) {
      return "shifts"; // Default tab for MANAGER
    }
    return "shifts"; // Fallback default
  };

  const [activeTab, setActiveTab] = useState<"products" | "equipment" | "shifts">(getInitialTab());

  return (
    <div>
      <div className="mb-4 mt-2 flex flex-wrap gap-4 m-auto justify-center sm:flex-nowrap">
        {auth?.isLoggedInAs(["MANAGER", "SALE"]) && (
          <Button
            onClick={() => setActiveTab("products")}
            variant={activeTab === "products" ? "default" : "outline"}
            size="default"
            className="flex-1 rounded-l"
          >
            Produkter
          </Button>
        )}
        {auth?.isLoggedInAs(["MANAGER", "OPERATOR"]) && (
          <Button
            onClick={() => setActiveTab("equipment")}
            variant={activeTab === "equipment" ? "default" : "outline"}
            size="default"
            className="flex-1 rounded-l"
          >
            Udstyr
          </Button>
        )}
        {auth?.isLoggedInAs(["MANAGER"]) && (
          <Button
            onClick={() => setActiveTab("shifts")}
            variant={activeTab === "shifts" ? "default" : "outline"}
            size="default"
            className="flex-1 rounded-l"
          >
            Vagter
          </Button>
        )}
      </div>
      {activeTab === "products" && <ProductManager />}
      {activeTab === "equipment" && <EquipmentManager />}
      {activeTab === "shifts" && <ShiftCalendar />}
    </div>
  );
}
