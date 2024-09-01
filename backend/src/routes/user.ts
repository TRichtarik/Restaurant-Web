import { Router } from 'express';
import { createController } from "../controllers/user/create";
import orderRouter from "./order";
import { userOwnershipAuth } from "../middleware/authMiddleware";
import { UserRole } from "../models/user";
import { updateController } from "../controllers/user/update";
// import { readSpecificController } from "../controllers/user/read";
// import auth from '../middleware/authMiddleware';
// import { UserRole } from "../models/user";

const userRouter = Router();

// userRouter.get('/', readAllController);
// userRouter.get('/:userId', userOwnershipAuth(UserRole.MANAGER), readSpecificController);

// This endpoint should only be accessible for UserRole.MANAGER in production, however, for testing purposes it is not restricted
userRouter.post('/', createController);

userRouter.patch('/', userOwnershipAuth(), updateController);

// userRouter.patch('/:userId', auth(UserRole.MANAGER), loginController);
// userRouter.delete('/', logoutController)
// userRouter.delete('/:userId', auth(UserRole.MANAGER), logoutController)

// Orders route
// - access to this route should be allowed if userId is of logged-in user or if user is manager/admin
userRouter.use('/:userId/order', userOwnershipAuth(UserRole.MANAGER), orderRouter);

export default userRouter;
