import { GroupedMenuItem } from "./menuTypes";

export enum OrderType {
    DELIVERY = "DELIVERY",
    PICK_UP = "PICK_UP"
}

export enum OrderState {
    CREATING = "CREATING",
    CANCELLED = "CANCELLED",
    WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
    PREPARING = "PREPARING",
    READY = "READY"
}


export interface Order {
    restaurantId: number;
    type: OrderType;
    scheduledFor: Date;
    state: OrderState;
    items: GroupedMenuItem[];
}

export interface CreateOrderData {
    userId: number;
    restaurantId: number;
    type: OrderType;
    scheduledFor: Date;
    items: {
        id: number;
        price: number;
    }[];
}

export interface OrderResult {
    id: number,
    userId: number;
    type: OrderType;
    scheduledFor: Date;
    items: {
        id: number;
        price: number;
    }[];
}