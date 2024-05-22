export interface UserData {
    email: string;
    username: string;
    password: string;
  }

  export interface UserData {
    username: string;
    password: string;
    email: string;
    name: string;
    address: string;
  }

  export interface Product {
    id?: number;
    name: string;
    stock: number;
    price: number;
    description: string;
    imageUrl: string;
    productCategory: string;
  }

  export interface Category {
    name: string;
  }

  export interface Sale {
    id?: number;
    salesItems: SalesItem[];
    
  }

  export interface SalesItem {
    product: { id: number}
    quantity: number;
  }
