import { Request, Response } from "express";
import { RestaurantParam } from "./types";
import { errorResponseHandler } from "../common";
import restaurantRepository from "../../repositories/restaurant/index";

export const deleteController = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = RestaurantParam.parse(req.params);

    const result = await restaurantRepository.deleteRestaurant({ id: restaurantId });

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    res.status(200).json(result.unwrap());
  } catch (e) {
    errorResponseHandler(e as Error, res);
  }
}