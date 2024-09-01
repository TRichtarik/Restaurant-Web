import { Request, Response } from "express";
import { RestaurantParam } from "../types";
import { MenuCreateParams } from "./types";
import { errorResponseHandler } from "../../common";
import menuRepository from "../../../repositories/restaurant/menu/index";
import { MenuCreateData } from "../../../repositories/restaurant/menu/types/data";

export const createController = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = RestaurantParam.parse(req.params);
    const { ...menuData } = MenuCreateParams.parse(req.body);

    const createData: MenuCreateData = {
      restaurantId: restaurantId,
      date: menuData.date,
      items: menuData.items,
    };

    const result = await menuRepository.create(createData);

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    res.status(201).json(result.unwrap());
  } catch (error) {
    errorResponseHandler(error as Error, res);
  }
}