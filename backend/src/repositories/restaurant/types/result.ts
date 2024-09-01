import type DbResult from '../../types';
import { Restaurant } from "@prisma/client";

type RestaurantOpeningHours = {
  id: number;
  dayOfWeek: number;
  openingTime: Date;
  closingTime: Date;
};

type RestaurantAddress = {
  id: number;
  address: string;
  city: string;
  zipCode: string;
}

type RestaurantFull = Restaurant & {
  openingHours: RestaurantOpeningHours[];
  address: RestaurantAddress | null;
};

export type DbRestaurantFull = DbResult<RestaurantFull>;

export type DbRestaurants = DbResult<(Restaurant & { openingHours: RestaurantOpeningHours[] })[]>;
