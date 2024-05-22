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

  export interface ProductRef {
    id: number;
  }

  export interface Sale {
    id?: number;
    date: string;
    employee: string;
    salesItems: SalesItem[];
    
  }

  export interface SalesItem {
    id?: number;
    product: Product;
    quantity: number;
    unitPrice: number;
  }
