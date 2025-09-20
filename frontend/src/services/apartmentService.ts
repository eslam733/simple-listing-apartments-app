import axios from "axios";
import { Apartment } from "@/types/apartment";
import { ApartmentFilter } from "@/types/apartmentFilter";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getApartments = async (filter: ApartmentFilter): Promise<Apartment[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/apartments`, {
      params: {
        name: filter.name,
        number: filter.unitNumber,
        project: filter.projectId,
      },
    });
    return data.data;
  } catch (error) {
    console.error("Failed to fetch apartments:", error);
    throw new Error("Unable to fetch apartments. Please try again later.");
  }
};

export const getApartmentById = async (id: string): Promise<Apartment> => {
  try {
    const { data } = await axios.get(`${API_URL}/apartments/${id}`);
    return data.data;
  } catch (error) {
    console.error(`Failed to fetch apartment with ID ${id}:`, error);
    throw new Error("Apartment not found.");
  }
};

export const createApartment = async (apartmentData: Partial<Apartment>) => {
  try {
    const { data } = await axios.post(`${API_URL}/apartments`, apartmentData);
    return data;
  } catch (error: any) {
    console.error("Failed to create apartment:", error.response?.data || error.message);

    // If there are validation errors, return them
    if (error.response?.data?.errors) {
      throw error.response.data.errors;
    }
    
    throw new Error(error.response?.data?.message || "Failed to create apartment. Please try again.");
  }
};
