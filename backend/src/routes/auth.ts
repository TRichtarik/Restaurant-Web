import { Router } from 'express';
import { auth } from '../middleware/authMiddleware';
import { checkController } from "../controllers/auth/check";
import { loginController } from "../controllers/auth/login";
import { logoutController } from "../controllers/auth/logout";
import { registrationController } from "../controllers/auth/registration";

const authRouter = Router();

authRouter.get('/', auth(), checkController)
authRouter.post('/registration', registrationController);
authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController)

export default authRouter;
