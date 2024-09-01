import { UserRole } from "../../../../models/user";
import { OrderType } from "@prisma/client";

type CreateOrderMenuItem = {
  id: number;
  price: number;
};

export type CreateOrderData = {
  type: OrderType;
  scheduledFor: Date;
  items: CreateOrderMenuItem[];
};

export type OrderUserIdentifier = {
  userId: number;
};

export type OrderIdentifier = {
  id: number;
}

export type OrderReadSpecificData = {
  id: number;
  userId: number;
  role: UserRole;
};