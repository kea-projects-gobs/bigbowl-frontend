import { useState, useEffect } from 'react';
import { SalesItem, Sale } from '@/interfaces/interfaces';
import { createSales } from '@/services/api/api';
import { useBasket } from '@/context/BasketProvider';

const BasketPage: React.FC = () => {
  const [basket, setBasket] = useState<SalesItem[]>([]);
  const { updateBasketCount } = useBasket();

  useEffect(() => {
    const storedBasket = localStorage.getItem('salesBasket');
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
        console.log('Sale confirmed:', response.data);
        setBasket([]);
        localStorage.removeItem('salesBasket');
        updateBasketCount();
      } else {
        console.error('Failed to confirm sale:', response.status);
      }
    } catch (error) {
      console.error('Error confirming sale:', error);
    }
  };

  return (
    <div>
      <h2>Basket</h2>
      <ul>
        {basket.map((item) => (
          <li key={item.product.id}>
            {item.product.id} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={confirmSale}>Confirm Sale</button>
    </div>
  );
};

export default BasketPage;