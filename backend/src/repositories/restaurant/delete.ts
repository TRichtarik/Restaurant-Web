import client from "../client";
import { Result } from "@badrap/result";
import { genericError } from "../types";
import { RestaurantIdentifier } from "./types/data";
import { DbRestaurantFull } from "./types/result";
import checkRestaurant from "./common";

const deleteRestaurant = async (identifier: RestaurantIdentifier): DbRestaurantFull => {
  try {
    return await client.$transaction(async (tx) => {
      const result = await checkRestaurant(identifier, tx);
      if (result.isErr) {
        return Result.err(result.error);
      }

      const restaurant = await tx.restaurant.update({
        where: identifier,
        data: {
          deletedAt: new Date()
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
    });
  } catch (e) {
    return genericError;
  }
};

export default deleteRestaurant;