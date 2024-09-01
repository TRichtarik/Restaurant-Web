export type OpeningHoursData = {
  dayOfWeek: number;
  openingTime: Date;
  closingTime: Date;
};

export type OpeningHoursIdentifier = {
  id: number;
} | {
  dayOfWeek: number;
  restaurantId: number;
};