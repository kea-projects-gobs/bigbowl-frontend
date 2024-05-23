import { useState, useEffect } from "react";
import { SalesItem, Sale } from "@/interfaces/interfaces";
import { createSales } from "@/services/api/api";
import { useBasket } from "@/context/BasketProvider";
import PriceComponent from "./PriceComponent";
import ConfirmComponent from "./ConfirmComponent";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";

const BasketPage: React.FC = () => {
  const [basket, setBasket] = useState<SalesItem[]>([]);
  const [saleConfirmed, setSaleConfirmed] = useState(false);
  const { updateBasketCount } = useBasket();
  const { toast } = useToast();

  useEffect(() => {
    const storedBasket = localStorage.getItem("salesBasket");
    if (storedBasket) {
      setBasket(JSON.parse(storedBasket));
    }
  }, []);

  const confirmSale = async () => {
    // Burde også været et tjek i backenden (men det er der ikke :D)
    if (basket.length === 0) {
      toast({
        title: "Ingen varer i kurven",
        description: "Tilføj venligst varer til kurven, og prøv igen",
        variant: "destructive",
      });
      return;
    }
    try {
      const sale: Sale = {
        salesItems: basket,
      };
      const response = await createSales(sale);
      if (response.status === 200) {
        console.log("Sale confirmed:", response.data);
        setBasket([]);
        localStorage.removeItem("salesBasket");
        updateBasketCount();
        setSaleConfirmed(true);
      } else {
        console.error("Failed to confirm sale:", response.status);
      }
    } catch (error) {
      console.error("Error confirming sale:", error);
    }
  };

  const incrementQuantity = (productId: number) => {
    const updatedBasket = basket.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setBasket(updatedBasket);
    localStorage.setItem("salesBasket", JSON.stringify(updatedBasket));
    updateBasketCount();
  };

  const decrementQuantity = (productId: number) => {
    const updatedBasket = basket
      .map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    setBasket(updatedBasket);
    localStorage.setItem("salesBasket", JSON.stringify(updatedBasket));
    updateBasketCount();
  };

  return (
    <div>
      {!saleConfirmed && (
        <>
        <h2 className="text-2xl font-bold my-4 ml-2">Kurv</h2>
        <PriceComponent
        basket={basket}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        />
        <Button className="py-6 text-1xl my-4" onClick={confirmSale}>
          Bekræft salg
        </Button>
        </>
      )}
      {saleConfirmed && <ConfirmComponent />}
    </div>
  );
};

export default BasketPage;
