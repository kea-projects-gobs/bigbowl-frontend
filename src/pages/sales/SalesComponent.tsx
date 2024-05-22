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
          updatedBasket = [...basket, { product, quantity: 1 }];
        }
        setBasket(updatedBasket);
        localStorage.setItem('salesBasket', JSON.stringify(updatedBasket));
        updateBasketCount();
      };
    
      return (
        <div>
          <h2 className="text-2xl font-bold my-4 ml-2">Sales</h2>
          <div className="flex flex-wrap mx-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                onClick={() => addToBasket(product)}
              >
                <div className="border rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105 h-full flex flex-col">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-contain mx-auto mt-2" />
                  <div className="p-4 text-center flex-grow">
                    <span className="text-lg font-medium">{product.name}</span>
                    <p className="text-md font-medium">{product.price} DKK</p>
                    <p className="text-sm font-medium">{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  };
  
  export default SalesComponent;
