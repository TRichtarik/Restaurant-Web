import { Router } from "express";
import { auth } from "../middleware/authMiddleware";
import { UserRole } from "../models/user";
import { createController } from "../controllers/restaurant/menu/create";
import { readAllController, readSpecificController } from "../controllers/restaurant/menu/read";
import { updateController } from "../controllers/restaurant/menu/update";
import { deleteController } from "../controllers/restaurant/menu/delete";

const menuRouter = Router({ mergeParams: true });

// all menus (for restaurant)
menuRouter.get('/', readAllController);
// menu overview
menuRouter.get('/:menuId', readSpecificController);
// create menu
menuRouter.post('/', auth(UserRole.MANAGER), createController);
// edit menu
menuRouter.patch('/:menuId', auth(UserRole.MANAGER), updateController);
// delete menu
menuRouter.delete('/:menuId', auth(UserRole.MANAGER), deleteController);

export default menuRouter;
