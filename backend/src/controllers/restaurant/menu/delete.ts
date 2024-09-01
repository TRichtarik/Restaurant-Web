import { Request, Response } from "express";
import { RestaurantMenuParams } from "./types";
import { errorResponseHandler } from "../../common";
import menuRepository from "../../../repositories/restaurant/menu/index";

export const deleteController = async (req: Request, res: Response) => {
  try {
    const params = RestaurantMenuParams.parse(req.params);

    const result = await menuRepository.deleteMenu({ id: params.menuId });

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    res.status(200).json(result.unwrap());
  } catch (error) {
    errorResponseHandler(error as Error, res);
  }
}