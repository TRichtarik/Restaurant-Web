export enum MenuItemType {
  SOUP = "SOUP",
  MAIN_COURSE = "MAIN_COURSE",
  DESSERT = "DESSERT",
  ALCOHOLIC_BEVERAGE = "ALCOHOLIC_BEVERAGE",
  NON_ALCOHOLIC_BEVERAGE = "NON_ALCOHOLIC_BEVERAGE"
}

export type MenuItem = {
  id: number;
  description: string;
  price: number;
  type: MenuItemType;
  menuId: number;
}

export type Menu = {
  id: number,
  restaurantName: string,
  date: Date,
  menuItems: GroupedMenuItem[]
}

export type GroupedMenuItem = {
  id: number;
  description: string;
  price: number;
  amount: number;
  type: MenuItemType;
  menuId: number;
}
