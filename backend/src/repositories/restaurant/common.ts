import { RestaurantIdentifier } from "./types/data";
import { Result } from "@badrap/result";
import DbResult, { genericError, PrismaTransactionHandle } from "../types";
import { DeletedRecordError, NonexistentRecordError } from "../../models/errors";

const checkRestaurant = async (identifier: RestaurantIdentifier, tx: PrismaTransactionHandle): DbResult<object> => {
  try {
    const restaurant = await tx.restaurant.findUnique({
      where: { id: identifier.id }
    });

    if (restaurant === null) {
      return Result.err(new NonexistentRecordError("Restaurant not found"));
    }

    if (restaurant.deletedAt !== null) {
      return Result.err(new DeletedRecordError("Restaurant has been deleted"));
    }

    return Result.ok({});
  } catch (e) {
    return genericError;
  }
};

export default checkRestaurant;