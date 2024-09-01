import client from "../client";
import { Result } from "@badrap/result";
import { genericError } from "../types";
import { RestaurantData } from "./types/data";
import { DbRestaurantFull } from "./types/result";

const create = async (data: RestaurantData): DbRestaurantFull => {
  try {
    const restaurant = await client.restaurant.create({
      data: {
        name: data.name,
        photo: data.photo,
        description: data.description,
        address: (data.address !== undefined && data.address !== null) ? {
          create: {
            address: data.address?.address,
            zipCode: data.address?.zipCode,
            city: data.address?.city
          }
        } : undefined,
        openingHours: (data.openingHours === undefined) ? undefined : {
          createMany: {
            data: data.openingHours
          }
        }
      },
      include: {
        address: {
          select: {
            id: true,
            address: true,
            city: true,
            zipCode: true
          }
        },
        openingHours: {
          select: {
            id: true,
            dayOfWeek: true,
            openingTime: true,
            closingTime: true
          }
        }
      }
    });

    return Result.ok(restaurant);
  } catch (e) {
    return genericError;
  }
};

export default create;