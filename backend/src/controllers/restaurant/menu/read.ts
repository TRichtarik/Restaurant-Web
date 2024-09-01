import { Request, Response } from "express";
import { RestaurantMenuParams } from "./types";
import { errorResponseHandler } from "../../common";
import { RestaurantParam } from "../types";
import menuRepository from "../../../repositories/restaurant/menu/index";

export const readAllController = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = RestaurantParam.parse(req.params);

    const result = await menuRepository.read.all({ restaurantId });

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
    const { restaurantId, menuId } = RestaurantMenuParams.parse(req.params);

    const result = await menuRepository.read.specific({ restaurantId, menuId });

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    res.status(200).json(result.unwrap());
  } catch (error) {
    errorResponseHandler(error as Error, res);
  }
}