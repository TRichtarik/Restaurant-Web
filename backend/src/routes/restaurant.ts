import { Router } from 'express';
import { auth } from "../middleware/authMiddleware";
import { UserRole } from "../models/user";
import { createController } from "../controllers/restaurant/create";
import { readAllController, readSpecificController } from "../controllers/restaurant/read";
import { updateController } from "../controllers/restaurant/update";
import { deleteController } from "../controllers/restaurant/delete";
import menuRouter from "./menu";

const restaurantRouter = Router();

// whole route should use default auth()
restaurantRouter.get('/', readAllController);
restaurantRouter.get('/:restaurantId', readSpecificController);
restaurantRouter.post('/', auth(UserRole.MANAGER), createController);
restaurantRouter.patch('/:restaurantId', auth(UserRole.MANAGER), updateController);
restaurantRouter.delete('/:restaurantId', auth(UserRole.MANAGER), deleteController)

restaurantRouter.use('/:restaurantId/menu', menuRouter);

export default restaurantRouter;
