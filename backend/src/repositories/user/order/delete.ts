import { OrderIdentifier } from "./types/data";
import { OrderOverviewResult } from "./types/result";
import client from "../../client";
import { Result } from "@badrap/result";
import { genericError } from "../../types";
import { NonexistentRecordError, CompletedOrderDeletionError } from "../../../models/errors";
import { OrderState } from "@prisma/client";

const deleteOrder = async (order: OrderIdentifier) : OrderOverviewResult => {
    try {
        return await client.$transaction(async (tx) => {
            const findOrder = await tx.order.findUnique({
                where: {
                    id: order.id,
                },
                include: {
                    items: true,
                }
            });

            if (findOrder === null) {
                return Result.err(new NonexistentRecordError("Order not found"));
            }

            const menuIds = findOrder.items.map(item => item.menuId);
            const menus = await client.menu.findMany({
                where: {
                    id: {
                        in: menuIds,
                    },
                },
                orderBy: {
                    date: 'desc',
                },
                take: 1,
            });
            if (menus.length > 0) {
                const latestMenu = menus[0];
                if (latestMenu.date <= new Date()) {
                    return Result.err(new CompletedOrderDeletionError("Completed order can not be deleted"));
                }
            }

            findOrder.state = OrderState.CANCELLED;

            return Result.ok(findOrder);
        });
    } catch (e) {
        return genericError;
    }
}

export default deleteOrder