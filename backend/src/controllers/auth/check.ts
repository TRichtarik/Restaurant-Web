import { Request, Response } from "express";
import userRepository from "../../repositories/user";
import { errorResponseHandler } from "../common";

/**
 * This controller provides information about the current authentication.
 * If the user is authorized it returns the user entity. If there is
 * invalid cookie or missing cookie, it returns 401.
 */
export const checkController = async (req: Request, res: Response) => {
  const email = req.session.user?.email;

  if (!email) {
    res.status(404).json({ message: 'Something went wrong' });
    return;
  }

  const result = await userRepository.read.one({ email });
  if (result.isErr) {
    errorResponseHandler(result.error, res);
    return;
  }

  res.status(200).json(result.unwrap());
}