import client from "../../client";
import { Result } from "@badrap/result";
import { genericError } from "../../types";
import { MenuIdentifier } from "./types/data";
import { MenuResult, Menu } from "./types/result";
import { NonexistentRecordError } from "../../../models/errors";
import { OrderState } from "@prisma/client";

const deleteMenu = async (identifier: MenuIdentifier) : MenuResult => {
    try {
        return await client.$transaction(async (tx) => {
            const findMenu = await tx.menu.findUnique({
                where: {
                    id: identifier.id,
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

            if (findMenu === null) {
                return Result.err(new NonexistentRecordError("Menu not found"));
            }

            const itemsListIds = findMenu.menuItems.map(item => item.id);
            await tx.order.updateMany({
                where: {
                    items: {
                        some: {
                            id: {
                                in: itemsListIds,
                            },
                        },
                    },
                },
                data: {
                    state: OrderState.CANCELLED,
                },
            });

            await tx.menuItem.deleteMany({
                where: {
                    menuId: identifier.id
                }
            });

            await tx.menu.delete({
                where: {
                    id: identifier.id
                }
            });

            const menuResult: Menu = {
                id: findMenu.id,
                restaurantName: findMenu.restaurant.name,
                date: findMenu.date,
                menuItems: findMenu.menuItems
            };

            return Result.ok(menuResult);
        });
    } catch (e) {
        return genericError;
    }
}

export default deleteMenu