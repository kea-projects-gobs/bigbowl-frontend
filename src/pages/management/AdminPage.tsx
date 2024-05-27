import { useState } from "react";
import { ProductManager } from "./ProductsManager";
import { EquipmentManager } from "./EquipmentManager";
import { useAuth } from "../../context/AuthProvider";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const auth = useAuth();

  // Determine the intial tab, based on role
  const getInitialTab = (): "products" | "equipment" | "test2" => {
    if (auth?.isLoggedInAs(["EMPLOYEE"])) {
      return "products"; // Default tab for employees
    }
    return "products"; // Fallback default
  };

  const [activeTab, setActiveTab] = useState<"products" | "equipment" | "test2">(getInitialTab());

  return (
    <div>
      <div className="mb-4 mt-2 flex flex-wrap gap-4 m-auto justify-center sm:flex-nowrap">
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
          </>
        )}
      </div>
      {activeTab === "products" && <ProductManager />}
      {activeTab === "equipment" && <EquipmentManager />}
      {activeTab === "test2" && <ProductManager />}
    </div>
  );
}
