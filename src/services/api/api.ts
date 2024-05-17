import axios from "axios";
import { UserData } from "../../interfaces/interfaces";
import { API_URL } from "../../settings";


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