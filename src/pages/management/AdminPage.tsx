import { useState } from "react";
import { ProductManager } from "./ProductsManager";
import { EquipmentManager } from "./EquipmentManager";
import ShiftCalendar from "../shifts/ShiftCalendar";
import { useAuth } from "../../context/AuthProvider";
import { Button } from "@/components/ui/button";
import ReservationsManager from "./ReservationsManager";
import ActivityManager from "./ActivityManager";

export default function AdminPage() {
  const auth = useAuth();

  type Tabs = "products" | "equipment" | "shifts" | "reservations" | "activity";

  // Determine the initial tab, based on role
  const getInitialTab = (): Tabs => {
    if (auth?.isLoggedInAs(["SALE"])) {
      return "products"; // Default tab for SALE
    } else if (auth?.isLoggedInAs(["OPERATOR"])) {
      return "equipment"; // Default tab for OPERATOR
    } else if (auth?.isLoggedInAs(["MANAGER"])) {
      return "shifts"; // Default tab for MANAGER
    }
    return "shifts"; // Fallback default
  };

  const [activeTab, setActiveTab] = useState<Tabs>(getInitialTab());

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 m-auto mt-2 mb-4 sm:flex-nowrap">
        {auth?.isLoggedInAs(["MANAGER", "SALE"]) && (
          <>
            <Button
              onClick={() => setActiveTab("products")}
              variant={activeTab === "products" ? "default" : "outline"}
              size="default"
              className="flex-1 rounded-l"
            >
              Produkter
            </Button>
            <Button
              onClick={() => setActiveTab("reservations")}
              variant={activeTab === "reservations" ? "default" : "outline"}
              size="default"
              className="flex-1 rounded-l"
            >
              Reservationer
            </Button>
            <Button
              onClick={() => setActiveTab("activity")}
              variant={activeTab === "activity" ? "default" : "outline"}
              size="default"
              className="flex-1 rounded-l"
            >
              Aktiviteter
            </Button>
          </>
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
          <>
            <Button
              onClick={() => setActiveTab("shifts")}
              variant={activeTab === "shifts" ? "default" : "outline"}
              size="default"
              className="flex-1 rounded-l"
            >
              Vagter
            </Button>
          </>
        )}
      </div>
      {activeTab === "products" && <ProductManager />}
      {activeTab === "equipment" && <EquipmentManager />}
      {activeTab === "reservations" && <ReservationsManager />}
      {activeTab === "activity" && <ActivityManager />}
      {activeTab === "shifts" && <ShiftCalendar />}
    </div>
  );
}
