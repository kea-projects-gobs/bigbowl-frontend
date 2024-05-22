import axios from "axios";
import axiosWithAuth from "../../security/axios";
import { UserData } from "../../interfaces/interfaces";
import { API_URL } from "../../settings";
import { Product, Sale } from "../../interfaces/interfaces";

const API_URL_PRODUCTS = `${API_URL}/products`;
const API_URL_SALES = `${API_URL}/sales`;

export const createUserWithRole = async (userData: UserData) => {
  try {
    const response = await axios.post(`${API_URL}/user-with-role`, userData);
    console.log("API call response:", response);
    return response.data; // Check what data you're getting back
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  } 
};

export const getProducts = async () => {
  return axiosWithAuth.get(API_URL_PRODUCTS);
};

export const getProductsById = async (id: number) => {
  return axiosWithAuth.get(`${API_URL_PRODUCTS}/${id}`);
};

export const createProducts = async (product: Product) => {
  return axiosWithAuth.post(API_URL_PRODUCTS, product);
};

export const updateProducts = async (id: number, product: Product) => {
  return axiosWithAuth.put(`${API_URL_PRODUCTS}/${id}`, product);
};

export const deleteProducts = async (id: number) => {
  return axiosWithAuth.delete(`${API_URL_PRODUCTS}/${id}`);
};

export const getCategories = async () => {
  return axiosWithAuth.get(`${API_URL}/product-categories`);
}

export const getSales = async () => {
  return axiosWithAuth.get(API_URL_SALES);
}

export const getSalesById = async (id: number) => {
  return axiosWithAuth.get(`${API_URL_SALES}/${id}`);
}

export const createSales = async (sale: Sale) => {
  return axiosWithAuth.post(API_URL_SALES, sale);
}

