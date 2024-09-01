import { Request, Response } from "express";
import { errorResponseHandler } from "../../common";
import { UserOrderParams } from "./types";
import orderRepository from "../../../repositories/user/order/index";

export const deleteController = async (req: Request, res: Response) => {
    try {
        const { orderId } = UserOrderParams.parse(req.params);

        const result = await orderRepository.deleteMenu({ id: orderId });

        if (result.isErr) {
            errorResponseHandler(result.error, res);
            return;
        }

        res.status(200).json(result.unwrap());
    } catch (e) {
        errorResponseHandler(e as Error, res);
    }
}