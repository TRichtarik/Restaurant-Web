import { z } from "zod";

export const UserOrderParams = z.object({
  userId: z.coerce.number().positive(),
  orderId: z.coerce.number().positive()
});

const OrderMenuItem = z.object({
  id: z.coerce.number(),
  price: z.coerce.number()
});

export const Order = z.object({
  type: z.enum(["DELIVERY", "PICK_UP"]),
  scheduledFor: z.coerce.date(),
  items: OrderMenuItem.array().min(1)
});
