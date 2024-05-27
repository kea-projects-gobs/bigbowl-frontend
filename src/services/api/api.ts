import axios from "axios";
import axiosWithAuth from "../../security/axios";
import { UserData } from "../../interfaces/interfaces";
import { API_URL } from "../../settings";
import { Product, Sale, Shift } from "../../interfaces/interfaces";
import { AvailableActivity, Reservation } from "@/interfaces/types";

const API_URL_PRODUCTS = `${API_URL}/products`;
const API_URL_SALES = `${API_URL}/sales`;
const API_URL_EQUIPMENT = `${API_URL}/equipment`;
const API_URL_RESERVATIONS = `${API_URL}/reservations`;
const API_URL_ACTIVITIES = `${API_URL}/activities`;
const API_URL_SHIFTS = `${API_URL}/shifts`;

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
};

export const getSales = async () => {
  return axiosWithAuth.get(API_URL_SALES);
};

export const getSalesById = async (id: number) => {
  return axiosWithAuth.get(`${API_URL_SALES}/${id}`);
};

export const createSales = async (sale: Sale) => {
  return axiosWithAuth.post(API_URL_SALES, sale);
};

export const createReservatition = async (reservation: Reservation) => {
  return axiosWithAuth.post(API_URL_RESERVATIONS, reservation);
};

export const getAvailableActivities = async (form: AvailableActivity) => {
  return axios.post(API_URL_ACTIVITIES, form);
};
// Equipment
export const getEquipment = async () => {
  return axiosWithAuth.get(API_URL_EQUIPMENT);
}

export const getEquipmentById = async (id: number) => {
  return axiosWithAuth.get(`${API_URL_EQUIPMENT}/${id}`);
}

export const orderReplacements = async (equipmentName: string) => {
  return axiosWithAuth.post(`${API_URL_EQUIPMENT}/order`, null, {
    params: {
      equipmentName: equipmentName
    }
  });
}

export const getShifts = async () => {
  return axiosWithAuth.get(API_URL_SHIFTS);
}

export const createShift = async (shift: Shift) => {
  return axiosWithAuth.post(API_URL_SHIFTS, shift);
}

export const updateShift = async (id: number, shift: Shift) => {
  return axiosWithAuth.put(`${API_URL_SHIFTS}/${id}`, shift);
}

export const deleteShift = async (id: number) => {
  return axiosWithAuth.delete(`${API_URL_SHIFTS}/${id}`);
}

// get users
export const getUsernames = async () => {
  return axiosWithAuth.get(`${API_URL}/user-with-role`);
}
