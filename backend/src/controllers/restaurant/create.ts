import { Request, Response } from "express";
import { errorResponseHandler } from "../common";
import { Restaurant } from "./types";
import restaurantRepository from "../../repositories/restaurant/index";

export const createController = async (req: Request, res: Response) => {
  try {
    const { ...restaurantData } = Restaurant.parse(req.body);

    const result = await restaurantRepository.create(restaurantData);

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    res.status(201).json(result.unwrap());
  } catch (error) {
    errorResponseHandler(error as Error, res);
  }
}