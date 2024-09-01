import { MenuItemType } from "@prisma/client";

type MenuItemData = {
    description: string;
    price: number;
    type: MenuItemType;
}

export type MenuCreateData = {
    restaurantId: number,
    date: Date,
    items?: MenuItemData[]
}

export type MenuReadData = {
    restaurantId: number
}

export type MenuReadSpecificData = {
    restaurantId: number,
    menuId: number
}

export type MenuIdentifier = {
    id: number
}