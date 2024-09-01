import type { User as UserWithPassword} from '@prisma/client';
import type DbResult from '../../types';
import {AddressData} from "../../address/types/data";

type DbUserWithPassword = DbResult<UserWithPassword & { addresses: AddressData[] }>;

type DbUser = DbResult<{
  id: number
  email: string
  name: string
  surname: string
  phoneNumber: string
  createdAt: Date
  deletedAt: Date | null
  role: string,
  addresses: AddressData[]
}>;

export type UserWithPasswordResult = DbUserWithPassword;

export type UserResult = DbUser;
