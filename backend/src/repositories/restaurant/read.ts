import client from "../client";
import { genericError } from "../types";
import { RestaurantFilterData, RestaurantIdentifier } from "./types/data";
import { DbRestaurantFull, DbRestaurants } from "./types/result";
import { Result } from "@badrap/result";
import { DeletedRecordError, NonexistentRecordError } from "../../models/errors";

// temporary solution as editing opening hours is not yet implemented
const defaultOpeningHours = [
  {
    id: 0,
    dayOfWeek: 0,
    openingTime: new Date("1970-01-01T08:00:00.000Z"),
    closingTime: new Date("1970-01-01T22:00:00.000Z")
  },
  {
    id: 1,
    dayOfWeek: 1,
    openingTime: new Date("1970-01-01T08:00:00.000Z"),
    closingTime: new Date("1970-01-01T22:00:00.000Z")
  },
  {
    id: 2,
    dayOfWeek: 2,
    openingTime: new Date("1970-01-01T08:00:00.000Z"),
    closingTime: new Date("1970-01-01T22:00:00.000Z")
  },
  {
    id: 3,
    dayOfWeek: 3,
    openingTime: new Date("1970-01-01T12:00:00.000Z"),
    closingTime: new Date("1970-01-01T22:00:00.000Z")
  },
  {
    id: 4,
    dayOfWeek: 4,
    openingTime: new Date("1970-01-01T12:00:00.000Z"),
    closingTime: new Date("1970-01-01T22:00:00.000Z")
  },
  {
    id: 5,
    dayOfWeek: 5,
    openingTime: new Date("1970-01-01T14:00:00.000Z"),
    closingTime: new Date("1970-01-01T22:00:00.000Z")
  },
  {
    id: 6,
    dayOfWeek: 6,
    openingTime: new Date("1970-01-01T14:00:00.000Z"),
    closingTime: new Date("1970-01-01T22:00:00.000Z")
  }
]

const readAll = async (data: RestaurantFilterData): DbRestaurants => {
  try {
    const restaurants = await client.restaurant.findMany({
      where: {
        deletedAt: null,
        name: {
          contains: data.name,
          mode: 'insensitive'
        },
        address: {
          address: {
            contains: data.address,
            mode: 'insensitive'
          },
          city: {
            contains: data.city,
            mode: 'insensitive'
          }
        }
      },
      include: {
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

    return Result.ok(restaurants.map((restaurant) => {
      restaurant.openingHours = defaultOpeningHours;
      return restaurant;
    }));
  } catch (e) {
    return genericError;
  }
}

const readSpecific = async (data: RestaurantIdentifier): DbRestaurantFull => {
  try {
    const restaurant = await client.restaurant.findUnique({
      where: data,
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
    })

    if (restaurant === null) {
      return Result.err(new NonexistentRecordError("A restaurant with provided id does not exist."));
    }

    if (restaurant.deletedAt !== null) {
      return Result.err(new DeletedRecordError("This restaurant has already been deleted."));
    }

    restaurant.openingHours = defaultOpeningHours;

    return Result.ok(restaurant);
  } catch (e) {
    return genericError;
  }
}

export default {
  all: readAll,
  specific: readSpecific
};