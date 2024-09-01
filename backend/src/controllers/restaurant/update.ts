import { Request, Response } from "express";
import { Restaurant, RestaurantParam } from "./types";
import { errorResponseHandler } from "../common";
import restaurantRepository from "../../repositories/restaurant/index"

export const updateController = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = RestaurantParam.parse(req.params);
    const { ...restaurantData } = Restaurant.parse(req.body);

    const result = await restaurantRepository.update( { id: restaurantId }, restaurantData);

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    res.status(200).json(result.unwrap());
  } catch (e) {
    errorResponseHandler(e as Error, res);
  }
}