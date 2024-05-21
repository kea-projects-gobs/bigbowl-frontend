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
