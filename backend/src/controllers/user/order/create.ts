import { Request, Response } from "express";
import { UserParam } from "../types";
import { errorResponseHandler } from "../../common";
import orderRepository from "../../../repositories/user/order/index";
import { Order } from "./types";


export const createController = async (req: Request, res: Response) => {
  try {
    const { userId } = UserParam.parse(req.params);
    const { ...data } = Order.parse(req.body);

    const result = await orderRepository.create({ userId }, data);

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    res.status(200).json(result.unwrap());
  } catch (error) {
    errorResponseHandler(error as Error, res);
  }
}