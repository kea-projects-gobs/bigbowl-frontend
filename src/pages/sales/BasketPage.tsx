import { useState, useEffect } from "react";
import { SalesItem, Sale } from "@/interfaces/interfaces";
import { createSales } from "@/services/api/api";
import { useBasket } from "@/context/BasketProvider";
import PriceComponent from "./PriceComponent";

const BasketPage: React.FC = () => {
  const [basket, setBasket] = useState<SalesItem[]>([]);
  const { updateBasketCount } = useBasket();

  useEffect(() => {
    const storedBasket = localStorage.getItem("salesBasket");
    if (storedBasket) {
      setBasket(JSON.parse(storedBasket));
    }
  }, []);

  const confirmSale = async () => {
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
      } else {
        console.error("Failed to confirm sale:", response.status);
      }
    } catch (error) {
      console.error("Error confirming sale:", error);
    }
  };

  const incrementQuantity = (productId: number) => {
    const updatedBasket = basket.map((item) =>
      item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setBasket(updatedBasket);
    localStorage.setItem('salesBasket', JSON.stringify(updatedBasket));
    updateBasketCount();
  };

  const decrementQuantity = (productId: number) => {
    const updatedBasket = basket
      .map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setBasket(updatedBasket);
    localStorage.setItem('salesBasket', JSON.stringify(updatedBasket));
    updateBasketCount();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-4 ml-2">Kurv</h2>
      <PriceComponent basket={basket} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={confirmSale}
      >
        Bekræft salg
      </button>
    </div>
    
  );
};

export default BasketPage;
