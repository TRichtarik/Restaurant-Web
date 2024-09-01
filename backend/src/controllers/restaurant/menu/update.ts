import { Request, Response } from "express";
import { RestaurantMenuParams } from "./types";
import { errorResponseHandler } from "../../common";

export const updateController = async (req: Request, res: Response) => {
  try {
    const { restaurantId, menuId } = RestaurantMenuParams.parse(req.params);

    /*
    * TODO: Call repository and handle errors
    * */

    res.status(200).json({ message: "Not yet implemented.", restaurantId, menuId });
  } catch (error) {
    errorResponseHandler(error as Error, res);
  }
}