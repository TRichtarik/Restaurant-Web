import { AccountData, RegisterUserData } from "../models/user";
import axiosInstance from "./base";

export const login = async (email: string, password: string): Promise<AccountData> => {
  const resp = await axiosInstance.post('/auth/login', { email, password });
  return resp.data;
}

export const auth = async (): Promise<AccountData> => {
  const resp = await axiosInstance.get<AccountData>('/auth', {});
  return resp.data;
}

export const logout = async () => {
  const resp = await axiosInstance.post('/auth/logout', {});
  return resp.data;
}

export const register = async (data: RegisterUserData): Promise<AccountData> => {
  const resp = await axiosInstance.post('auth/registration', data)
  return resp.data;
}