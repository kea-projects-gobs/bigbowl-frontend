import { useState, useEffect } from "react";
import { SalesItem, Sale } from "@/interfaces/interfaces";
import { createSales } from "@/services/api/api";
import { useBasket } from "@/context/BasketProvider";

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
    <h2 className="text-2xl font-bold mb-4">Basket</h2>
    <ul className="mb-4">
      {basket.map((item) => (
        <li key={item.product.id} className="flex items-center justify-between mb-2">
          <div>
            {item.product.name} - Quantity: {item.quantity}
          </div>
          <div className="flex items-center">
            <button
              className="bg-gray-200 px-2 py-1 rounded mr-2"
              onClick={() => decrementQuantity(item.product.id!)}
            >
              -
            </button>
            <button
              className="bg-gray-200 px-2 py-1 rounded"
              onClick={() => incrementQuantity(item.product.id!)}
            >
              +
            </button>
          </div>
        </li>
      ))}
    </ul>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={confirmSale}
    >
      Confirm Sale
    </button>
  </div>
  );
};

export default BasketPage;
