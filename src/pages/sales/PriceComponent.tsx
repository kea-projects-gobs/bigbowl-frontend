import { SalesItem } from "@/interfaces/interfaces";

interface SalePriceProps {
  basket: SalesItem[];
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
}

const PriceComponent: React.FC<SalePriceProps> = ({
  basket,
  incrementQuantity,
  decrementQuantity,
}) => {
  const calculateTotalPrice = () => {
    return basket.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Dit køb</h2>
      <ul className="mb-4">
        {basket.map((item, index) => (
          <div key={item.product.id}>
            <li className="flex justify-between items-center mb-2">
              <span>
                {item.product.name} {item.product.description} x {item.quantity}
              </span>
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
                <span className="ml-4 w-24 text-right">
                  {(item.product.price * item.quantity).toFixed(2)} DKK
                </span>
              </div>
            </li>
            {index < basket.length - 1 && <hr className="my-2" />}
          </div>
        ))}
      </ul>
      <hr className="my-2 border-gray-400" />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>{calculateTotalPrice().toFixed(2)} DKK</span>
      </div>
    </div>
  );
};

export default PriceComponent;
