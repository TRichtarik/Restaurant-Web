import { z } from 'zod';
import { Address } from "../common";

export const OpeningHours = z.object({
  dayOfWeek: z.coerce.number().min(0).max(6),
  openingTime: z.coerce.date(),
  closingTime: z.coerce.date(),
});

export const Restaurant = z.object({
  name: z.string(),
  photo: z.string().optional(),
  description: z.string(),
  address: Address.optional().nullable(),
  openingHours: OpeningHours.array().optional()
});

export const RestaurantParam = z.object({
  restaurantId: z.coerce.number().positive()
});