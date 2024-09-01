import { OpeningHoursData } from "../opening-hours/types/data";
import { AddressData } from "../../address/types/data";

export type RestaurantIdentifier = {
  id: number;
}

export type RestaurantFilterData = {
  name: string | undefined;
  address: string | undefined;
  city: string | undefined;
};

export type RestaurantData = {
  name: string;
  photo?: string;
  description: string;
  address?: AddressData | null;
  openingHours?: OpeningHoursData[];
};
