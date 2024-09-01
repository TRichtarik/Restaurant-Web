import { UserRole } from '../../../models/user';
import { AddressData } from "../../address/types/data";

export type UserUpdateData = {
  id: number;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  address: AddressData;
  hashedPassword?: string
}

export type UserCreateData = {
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  role: UserRole;
  address: AddressData;
  hashedPassword: string;
};

export type UserReadOneData = {
  id: number;
} | {
  email: string;
};
