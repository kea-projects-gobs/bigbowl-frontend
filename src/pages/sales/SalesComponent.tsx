import { useEffect, useState } from "react";
import { Product, SalesItem } from "@/interfaces/interfaces";
import { getProducts } from "@/services/api/api";
import { useBasket } from "../../context/BasketProvider";

const SalesComponent: React.FC = () => {
    const [basket, setBasket] = useState<SalesItem[]>(() => {
        const storedBasket = localStorage.getItem('salesBasket');
        if (storedBasket) {
            return JSON.parse(storedBasket);
        }
        return [];
    });
    const [products, setProducts] = useState<Product[]>([]);
    const { updateBasketCount } = useBasket();

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        const response = await getProducts();
        setProducts(response.data);
    }
  
    const addToBasket = (product: Product) => {
        if (product.id === undefined) {
          console.error('Product ID is undefined');
          return;
        }
    
        const existingItem = basket.find((item) => item.product.id === product.id);
        let updatedBasket;
        if (existingItem) {
          updatedBasket = basket.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          updatedBasket = [...basket, { product: { id: product.id }, quantity: 1 }];
        }
        setBasket(updatedBasket);
        localStorage.setItem('salesBasket', JSON.stringify(updatedBasket));
        updateBasketCount();
      };
    
      return (
        <div>
          <h2>Sales</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <span>{product.name}</span>
                <button onClick={() => addToBasket(product)}>Add to Basket</button>
              </li>
            ))}
          </ul>
        </div>
      );
  };
  
  export default SalesComponent;
