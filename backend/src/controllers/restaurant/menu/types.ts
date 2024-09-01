import { z } from "zod";

export const RestaurantMenuParams = z.object({
  restaurantId: z.coerce.number().positive(),
  menuId: z.coerce.number().positive()
});

export const MenuItem = z.object({
  description: z.string(),
  price: z.coerce.number(),
  type: z.enum(["SOUP", "MAIN_COURSE", "DESSERT", "ALCOHOLIC_BEVERAGE", "NON_ALCOHOLIC_BEVERAGE"]),
})

export const MenuCreateParams = z.object({
  date: z.coerce.date(),
  items: MenuItem.array()
});