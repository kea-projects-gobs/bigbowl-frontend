import { SalesItem } from '@/interfaces/interfaces';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';

interface BasketContextType {
  basketCount: number;
  updateBasketCount: () => void;
}

interface BasketProviderProps {
    children: React.ReactNode;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<BasketProviderProps> = ({ children }) => {
  const [basketCount, setBasketCount] = useState(0);
  const location = useLocation();

  const updateBasketCount = useCallback(() => {
    // Add reservationItem below.
    let basket: SalesItem[] = [];
    if (location.pathname.startsWith('/sales')) {
      const salesBasket = localStorage.getItem('salesBasket');
      if (salesBasket) {
        basket = JSON.parse(salesBasket);
      }
    } else if (location.pathname.startsWith('/booking')) {
      const bookingBasket = localStorage.getItem('bookingBasket');
      if (bookingBasket) {
        basket = JSON.parse(bookingBasket);
      }
    }
    // Add reservationItem below.
    const count = basket.reduce((acc: number, item: SalesItem) => acc + item.quantity, 0);
    setBasketCount(count);
  }, [location.pathname]);

  useEffect(() => {
    updateBasketCount();
    window.addEventListener('storage', updateBasketCount);

    return () => {
      window.removeEventListener('storage', updateBasketCount);
    };
  }, [location.pathname, updateBasketCount]);

  return (
    <BasketContext.Provider value={{ basketCount, updateBasketCount }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};