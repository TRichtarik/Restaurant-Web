import { z } from 'zod';
import { Address } from "../common";

export const UserUpdate = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  password: z.string().min(8).optional(),
  phoneNumber: z.string(),
  address: Address
});

export const User = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string(),
  role: z.enum(["CUSTOMER", "MANAGER"]),
  address: Address
});

export const UserParam = z.object({
  userId: z.coerce.number()
});