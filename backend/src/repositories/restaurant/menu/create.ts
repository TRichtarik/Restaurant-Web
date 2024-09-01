import client from "../../client";
import { Result } from "@badrap/result";
import { genericError } from "../../types";
import { MenuCreateData } from "./types/data";
import { MenuResult, Menu } from "./types/result";

const create = async (data: MenuCreateData) : MenuResult => {
    try {
        const menu = await client.menu.create({
            data: {
                restaurantId: data.restaurantId,
                date: data.date,
                menuItems: (data.items !== undefined) ? {
                    createMany: {
                        data: data.items
                    }
                } : undefined,
            },
            include: {
                menuItems: true,
                restaurant: {
                    select: {
                        name: true,
                    }
                }
            }
        });

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

export default create