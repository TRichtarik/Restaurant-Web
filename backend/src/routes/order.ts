import { Router } from "express";
import { readAllController, readSpecificController } from "../controllers/user/order/read";
import { createController } from "../controllers/user/order/create";
import { deleteController } from "../controllers/user/order/delete";

const orderRouter = Router({ mergeParams: true });

// all orders (of user)
orderRouter.get('/', readAllController);
// order overview
orderRouter.get('/:orderId', readSpecificController);
// create order
orderRouter.post('/', createController);
// cancel order
orderRouter.delete('/:orderId', deleteController);

export default orderRouter;
