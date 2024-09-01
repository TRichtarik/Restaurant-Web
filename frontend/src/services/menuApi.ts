import { Menu } from "../models/menuTypes";
import axiosInstance from "./base";

export const getAll = async (id: string): Promise<Menu[]> => {
    const response = await axiosInstance.get(`/restaurant/${id}/menu/`);
    return response.data;
}

