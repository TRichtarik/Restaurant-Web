import { z } from 'zod';
import { Address } from "../common";

export const User = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string(),
  address: Address
});

export const Login = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
