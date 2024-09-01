import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/user';
import { UserParam } from "../controllers/user/types";

export const auth = (...role: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (role.length > 0 && !role.includes(req.session.user.role)) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }
  next();
}

/**
 * This middleware serves as authorization of ownership (e.g. of an order related request)
 * that the request is coming from either logged-in user or a role that is above.
 *
 * Note that if role is not provided, no other user can access the content.
 */
export const userOwnershipAuth = (...role: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const result = UserParam.safeParse(req.params);
  if (!result.success) {
    next();
    return;
  }

  if (result.data.userId !== req.session.user.id && (role.length === 0 || !role.includes(req.session.user.role))) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }
  next();
}