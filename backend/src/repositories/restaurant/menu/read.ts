import client from "../../client";
import { Result } from "@badrap/result";
import { genericError } from "../../types";
import { MenuReadData, MenuReadSpecificData } from "./types/data";
import { DbMenus, MenuResult, Menu } from "./types/result";
import { NonexistentRecordError } from "../../../models/errors";

const readAll = async (data: MenuReadData) : DbMenus => {
    try {
        const today = new Date();
        const endDate = new Date();
        endDate.setDate(today.getDate() + 7);

        const menus = await client.menu.findMany({
            where: {
                restaurantId: data.restaurantId,
                date: {
                    gte: today,
                    lte: endDate,
                }
            },
            select: {
                id: true,
                date: true,
                restaurant: {
                    select: {
                        name: true,
                    }
                },
                menuItems: {
                    orderBy: {
                        type: 'asc'
                    }
                }
            },
            orderBy: {
                date: 'asc',
            },     
        });

        return Result.ok(menus.map(menu => ({
            id: menu.id,
            restaurantName: menu.restaurant.name,
            date: menu.date,
            menuItems: menu.menuItems
        })));

    } catch (e) {
        return genericError;
    }
}

const readSpecific = async (data: MenuReadSpecificData) : MenuResult => {
    try {
        const menu = await client.menu.findUnique({
            where: {
                id: data.menuId
            },
            select: {
                id: true,
                date: true,
                restaurant: {
                    select: {
                        name: true,
                    }
                },
                menuItems: true
            }
        });

        if (menu === null) {
            return Result.err(new NonexistentRecordError('The specified menu does not exist!'));
        }

        const menuResult: Menu = {
            id: menu.id,
            restaurantName: menu.restaurant.name,
            date: menu.date,
            menuItems: menu.menuItems
        };

        return Result.ok(menuResult);
    } catch (e) {
        return genericError;
    }
}

export default {
    all: readAll,
    specific: readSpecific
  };