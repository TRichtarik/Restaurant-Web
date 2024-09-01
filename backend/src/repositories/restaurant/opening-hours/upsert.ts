import { RestaurantIdentifier } from "../types/data";
import { Result } from "@badrap/result";
import { genericError, PrismaTransactionHandle } from "../../types";
import { OpeningHoursData } from "./types/data";
import { DbOpeningHours } from "./types/result";

const upsert = async (
  data: OpeningHoursData,
  restaurantIdentifier: RestaurantIdentifier,
  transaction: PrismaTransactionHandle
): DbOpeningHours => {
  try {
    const hours = await transaction.openingHour.upsert({
      where: {
        restaurantOpeningDay: {
          restaurantId: restaurantIdentifier.id,
          dayOfWeek: data.dayOfWeek
        }
      },
      create: {
        restaurantId: restaurantIdentifier.id,
        ...data
      },
      update: data
    })

    return Result.ok(hours);
  } catch (e) {
    return genericError;
  }
};

export default upsert;