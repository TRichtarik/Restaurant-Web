import { Request, Response } from "express";
import { errorResponseHandler } from "../common";
import { RestaurantParam } from "./types";
import z from 'zod';
import restaurantRepository from "../../repositories/restaurant/index";

const RestaurantFilterData = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional()
});

export const readAllController = async (req: Request, res: Response) => {
  try {
    const { ...filter } = RestaurantFilterData.parse(req.query);

    const result = await restaurantRepository.read.all({
      name: filter.name ?? undefined,
      address: filter.address ?? undefined,
      city: filter.city ?? undefined
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

export const readSpecificController = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = RestaurantParam.parse(req.params);

    const result = await restaurantRepository.read.specific({ id: restaurantId });

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    res.status(200).json(result.unwrap());
  } catch (e) {
    errorResponseHandler(e as Error, res);
  }
}