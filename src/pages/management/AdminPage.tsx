import  { useState } from 'react';
import { ProductManager } from './ProductsManager';
import { useAuth } from '../../security/AuthProvider';

export default function AdminPage() {
  const auth = useAuth();
  
  // Determine the intial tab, based on role
  const getInitialTab = (): 'products' => {
    if (auth?.isLoggedInAs(["ADMIN"])) {
      return 'products'; // Default tab for admins
    }
    return 'products'; // Fallback default
  };

  const [activeTab, setActiveTab] = useState<'products'>(getInitialTab());

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4 max-w-5xl m-auto justify-center sm:flex-nowrap">
        {auth?.isLoggedInAs(["EMPLOYEE"]) && (
      <>
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-2 px-4 font-bold ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-l`}
        >
          Produkter
        </button>
        </>
        )}
      </div>
      {activeTab === 'products' && <ProductManager />}
    </div>
  );
}
