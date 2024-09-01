import base from "./base";
import { AccountData, EditUserData } from "../models/user";

export const editAccount = async (data: EditUserData): Promise<AccountData> => {
  const resp = await base.patch('/user', data);
  return resp.data;
}