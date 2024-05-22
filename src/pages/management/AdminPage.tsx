import  { useState } from 'react';
import { ProductManager } from './ProductsManager';
import { useAuth } from '../../context/AuthProvider';

export default function AdminPage() {
  const auth = useAuth();
  
  // Determine the intial tab, based on role
  const getInitialTab = (): 'products' | 'test1' | 'test2' => {
    if (auth?.isLoggedInAs(["EMPLOYEE"])) {
      return 'products'; // Default tab for employees
    }
    return 'products'; // Fallback default
  };

  const [activeTab, setActiveTab] = useState<'products' | 'test1' | 'test2'>(getInitialTab());

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4 m-auto justify-center sm:flex-nowrap">
        {auth?.isLoggedInAs(["EMPLOYEE"]) && (
      <>
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-2 px-4 font-bold ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-l`}
        >
          Produkter
        </button>
        <button
          onClick={() => setActiveTab('test1')}
          className={`flex-1 py-2 px-4 font-bold ${activeTab === 'test1' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-l`}
        >
          Bowling baner
        </button>
        <button
          onClick={() => setActiveTab('test2')}
          className={`flex-1 py-2 px-4 font-bold ${activeTab === 'test2' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-l`}
        >
          Udstyr
        </button>
        </>
        )}
      </div>
      {activeTab === 'products' && <ProductManager />}
      {activeTab === 'test1' && <ProductManager />}
      {activeTab === 'test2' && <ProductManager />}
    </div>
  );
}
