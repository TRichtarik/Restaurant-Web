import client from "../../client";
import { Result } from "@badrap/result";
import {NonexistentRecordError, WrongOwnershipError} from "../../../models/errors";
import { genericError } from "../../types";
import { OrderUserIdentifier, OrderReadSpecificData } from "./types/data";
import { OrderOverviewResult, OrdersResult } from "./types/result";
import { UserRole} from "../../../models/user";

const readSpecific = async (data: OrderReadSpecificData): OrderOverviewResult => {
  try {
    const order = await client.order.findUnique({
      where: { ...data },
      include: {
        items: true
      }
    });

    if (order === null) {
      return Result.err(new NonexistentRecordError('The specified order does not exist!'));
    }

    if (order.creatorId !== data.userId && data.role !== UserRole.MANAGER) {
      return Result.err(new WrongOwnershipError('The order does not belong to the specified user'))
    }

    return Result.ok(order);
  } catch (e) {
    return genericError;
  }
}

const readAll = async (data: OrderUserIdentifier): OrdersResult => {
  try {
    const orders = await client.order.findMany({
      where: { creatorId: data.userId }
    });

    return Result.ok(orders);
  } catch (e) {
    return genericError;
  }
};

export default {
  specific: readSpecific,
  all: readAll
};