import { Request, Response } from "express";

/**
 * Remove the authorized user from session storage.
 */
export const logoutController = async (req: Request, res: Response) => {
  req.session.destroy(() => undefined);
  res.status(200).json({ message: 'Logged out' });
}