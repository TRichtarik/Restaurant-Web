import { RestaurantIdentifier } from "../restaurant/types/data";
import { Result } from "@badrap/result";
import { genericError, PrismaTransactionHandle } from "../types";
import { AddressData } from "./types/data";
import { DbAddress } from "./types/result";
import { DeletedRecordError, NonexistentRecordError } from "../../models/errors";

const updateRestaurantAddress = async (
  data: AddressData | null,
  restaurantIdentifier: RestaurantIdentifier,
  transaction: PrismaTransactionHandle
): DbAddress => {
  try {
    if (data === null) {
     return Result.ok(await transaction.address.delete({
        where: { restaurantId: restaurantIdentifier.id }
      }));
    }

    const restaurant = await transaction.restaurant.findUnique({ where: { id: restaurantIdentifier.id } });
    if (restaurant === null) {
      return Result.err(new NonexistentRecordError("Restaurant for the provided id does not exist."));
    }

    if (restaurant.deletedAt !== null) {
      return Result.err(new DeletedRecordError("The restaurant for the provided is has been deleted."));
    }

    return Result.ok(await transaction.address.upsert({
      where: { restaurantId: restaurantIdentifier.id },
      create: data,
      update: data
    }));
  } catch (e) {
    return genericError;
  }
};

export default {
  restaurantAddress: updateRestaurantAddress
};