import base from "./base";
import { CreateOrderData, OrderResult } from "../models/orderTypes"

export const create = async (data: CreateOrderData): Promise<OrderResult> => {
    const resp = await base.post(`/user/${data.restaurantId}/order`, data);
    return resp.data;
}