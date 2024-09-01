import { atom } from "recoil";
import { Order } from "../models/orderTypes";

export const currentOrderAtom = atom<Order | undefined>({
  key: 'currentOrder',
  default: undefined
});