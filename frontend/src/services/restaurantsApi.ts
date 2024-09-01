import { EditRestaurantData, Restaurant, RestaurantExtended } from "../models/restaurantTypes";
import axiosInstance from "./base";

export const getAll = async (): Promise<Restaurant[]> => {
    const response = await axiosInstance.get('/restaurant');
    return response.data;
  }

export const getSingle = async (id: string): Promise<RestaurantExtended> => {
    const response = await axiosInstance.get(`/restaurant/${id}`);
    return response.data;
}

export const create = async (data: EditRestaurantData): Promise<RestaurantExtended> => {
    const response = await axiosInstance.post('/restaurant', data);
    return response.data;
}

export const update = async (id: string, data: EditRestaurantData): Promise<RestaurantExtended> => {
    const response = await axiosInstance.patch(`/restaurant/${id}`, data);
    return response.data;
}
