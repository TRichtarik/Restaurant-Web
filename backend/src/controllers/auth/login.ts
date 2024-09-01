import { Request, Response } from "express";
import { Login } from "./types";
import userRepository from "../../repositories/user";
import { errorResponseHandler } from "../common";
import argon2 from "argon2";
import { UserRole } from "../../models/user";

/**
 * This endpoint verifies the user credentials and adds the user and
 * role to session storage.
 */
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = Login.parse(req.body);
    const result = await userRepository.read.oneWithPassword({ email });

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    const user = result.unwrap();
    const isVerified = await argon2.verify(user.hashedPassword, password);

    if (!isVerified) {
      res.status(401).json({ message: 'Wrong password' });
      return;
    }

    req.session.user = { id: user.id, email: user.email, role: user.role as UserRole };
    res.status(200).json({ message: 'Logged in' });
  } catch (error) {
    errorResponseHandler(error as Error, res);
  }
}