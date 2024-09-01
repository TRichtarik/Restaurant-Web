import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { UserRole } from './models/user';
import bodyParser from 'body-parser';
import session from './middleware/sessionMiddleware';
import authRouter from './routes/auth';
import restaurantRouter from "./routes/restaurant";
import userRouter from './routes/user';
import { auth } from './middleware/authMiddleware';

declare module 'express-session' {
  interface SessionData { user: { id: number, email: string, role: UserRole } }
}

dotenv.config();
const api = express();
const port = process.env.BACKEND_PORT ?? 4000;

api.use(bodyParser.json());
api.use(cookieParser());
api.use(session());
api.use(express.urlencoded({ extended: true }));

api.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true
}));

/**
 * Send greetings to API Client
 */
api.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to the Restaurant Corona API!'
}));

api.use('/auth', authRouter);
api.use('/restaurant', auth(), restaurantRouter);
api.use('/user', userRouter);

/**
 * Start listening on connections
 */
api.listen(port, () => console.log(`Example app listening on port ${port}`));
