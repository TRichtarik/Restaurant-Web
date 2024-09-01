import client from "../client";
import { Result } from "@badrap/result";
import { genericError } from "../types";
import { RestaurantData, RestaurantIdentifier } from "./types/data";
import { DbRestaurantFull } from "./types/result";
import checkRestaurant from "./common";

const updateRestaurant = async (identifier: RestaurantIdentifier, data: RestaurantData): DbRestaurantFull => {
  try {
    return await client.$transaction(async (tx) => {
      const result = await checkRestaurant(identifier, tx);
      if (result.isErr) {
        return Result.err(result.error);
      }

      if (data.openingHours !== undefined) {
        await tx.openingHour.deleteMany({ where: { restaurantId: identifier.id } });
      }

      if (data.address === null) {
        await tx.address.delete({
          where: { restaurantId: identifier.id }
        });
      }

      const restaurant = await tx.restaurant.update({
        where: identifier,
        data: {
          name: data.name,
          description: data.description,
          photo: data.photo,
          address: (data.address === null || data.address === undefined) ? undefined : {
            upsert: {
              create: data.address,
              update: data.address
            }
          },
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
    })
  } catch (e) {
    return genericError;
  }
};

export default updateRestaurant;