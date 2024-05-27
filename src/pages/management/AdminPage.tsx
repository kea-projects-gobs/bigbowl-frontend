import { useState } from "react";
import { ProductManager } from "./ProductsManager";
import { EquipmentManager } from "./EquipmentManager";
import { useAuth } from "../../context/AuthProvider";
import { Button } from "@/components/ui/button";
import ReservationsManagerPage from "./ReservationsManagerPage";

export default function AdminPage() {
  const auth = useAuth();

  type Tabs = "products" | "equipment" | "test2" | "reservationer";

  // Determine the intial tab, based on role
  const getInitialTab = (): Tabs => {
    if (auth?.isLoggedInAs(["EMPLOYEE"])) {
      return "products"; // Default tab for employees
    }
    return "products"; // Fallback default
  };

  const [activeTab, setActiveTab] = useState<Tabs>(getInitialTab());

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 m-auto mt-2 mb-4 sm:flex-nowrap">
        {auth?.isLoggedInAs(["EMPLOYEE"]) && (
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
              onClick={() => setActiveTab("equipment")}
              variant={activeTab === "equipment" ? "default" : "outline"}
              size="default"
              className="flex-1 rounded-l"
            >
              Udstyr
            </Button>
            <Button
              onClick={() => setActiveTab("test2")}
              variant={activeTab === "test2" ? "default" : "outline"}
              size="default"
              className="flex-1 rounded-l"
            >
              Bowling baner
            </Button>
            <Button
              onClick={() => setActiveTab("reservationer")}
              variant={activeTab === "reservationer" ? "default" : "outline"}
              size="default"
              className="flex-1 rounded-l"
            >
              Reservationer
            </Button>
          </>
        )}
      </div>
      {activeTab === "products" && <ProductManager />}
      {activeTab === "equipment" && <EquipmentManager />}
      {activeTab === "test2" && <ProductManager />}
      {activeTab === "reservationer" && <ReservationsManagerPage />}
    </div>
  );
}
