import { CreateOrderData, OrderUserIdentifier } from "./types/data";
import { OrderOverviewResult } from "./types/result";
import client from "../../client";
import { Result } from "@badrap/result";
import { genericError } from "../../types";
import { OrderState } from "@prisma/client";

const create = async (user: OrderUserIdentifier, data: CreateOrderData): OrderOverviewResult => {
  try {
    const orders = await client.order.create({
      data: {
        ...data,
        totalPrice: data.items.reduce((acc, item) => acc + Number(item.price), 0.0),
        creatorId: user.userId,
        state: OrderState.READY,
        items: {
          connect: data.items.map((item) => { return { id: item.id } })
        }
      },
      include: {
        items: true
      }
    });

    return Result.ok(orders);
  } catch (e) {
    return genericError;
  }
};

export default create;
