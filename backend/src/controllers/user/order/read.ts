import { Request, Response } from "express";
import { UserParam } from "../types";
import { errorResponseHandler } from "../../common";
import { UserOrderParams } from "./types";
import orderRepository from "../../../repositories/user/order/index";
import { UserRole } from "../../../models/user";

export const readAllController = async (req: Request, res: Response) => {
  try {
    const { userId } = UserParam.parse(req.params);

    const result = await orderRepository.read.all({ userId });

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    res.status(200).json(result.unwrap());
  } catch (error) {
    errorResponseHandler(error as Error, res);
  }
}

export const readSpecificController = async (req: Request, res: Response) => {
  try {
    const { userId, orderId } = UserOrderParams.parse(req.params);

    const result = await orderRepository.read.specific({
      id: orderId,
      userId,
      role: req.session?.user?.role ?? UserRole.CUSTOMER
    });

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    res.status(200).json(result.unwrap());
  } catch (error) {
    errorResponseHandler(error as Error, res);
  }
}