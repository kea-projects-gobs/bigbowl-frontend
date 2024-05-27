import axios from "axios";
import axiosWithAuth from "../../security/axios";
import { UserData } from "../../interfaces/interfaces";
import { API_URL } from "../../settings";
import { Product, Sale } from "../../interfaces/interfaces";
import { AvailableActivity, Reservation } from "@/interfaces/types";

const API_URL_PRODUCTS = `${API_URL}/products`;
const API_URL_SALES = `${API_URL}/sales`;
const API_URL_EQUIPMENT = `${API_URL}/equipment`;
const API_URL_RESERVATIONS = `${API_URL}/reservations`;
const API_URL_ACTIVITIES = `${API_URL}/activities`;

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
};

export const getEquipmentById = async (id: number) => {
  return axiosWithAuth.get(`${API_URL_EQUIPMENT}/${id}`);
};

export const orderReplacements = async (equipmentName: string) => {
  return axiosWithAuth.post(`${API_URL_EQUIPMENT}/order`, null, {
    params: {
      equipmentName: equipmentName,
    },
  });
};

export const getAllReservations = async (from?: Date, to?: Date) => {
  if (from !== undefined && to !== undefined) {
    return axiosWithAuth.get(
      `${API_URL_RESERVATIONS}?from=${from
        .toISOString()
        .substring(0, 10)}&to=${to.toISOString().substring(0, 10)}`
    );
  } else {
    return axiosWithAuth.get(`${API_URL_RESERVATIONS}`);
  }
};

export const deleteReservation = async (id: number) => {
  return axiosWithAuth.delete(`${API_URL_RESERVATIONS}/${id}`);
};

export const toggleReservationStatus = async (id: number, status: boolean) => {
  return axiosWithAuth.patch(`${API_URL_RESERVATIONS}/${id}?status=${status}`);
};
