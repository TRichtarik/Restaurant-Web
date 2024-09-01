import DbResult from "../../../types";
import { Order, MenuItem } from "@prisma/client";

type DbOrderOverview = DbResult<Order & { items: MenuItem[] }>;

type DbOrders = DbResult<Order[]>;

export type OrdersResult = DbOrders;

export type OrderOverviewResult = DbOrderOverview;