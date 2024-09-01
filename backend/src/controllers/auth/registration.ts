import { Request, Response } from "express";
import { User } from "./types";
import argon2 from "argon2";
import userRepository from "../../repositories/user";
import { UserRole } from "../../models/user";
import { errorResponseHandler } from "../common";

/**
 * It gets the user email, password and other user attributes and returns
 * the new registered user.
 */
export const registrationController = async (req: Request, res: Response) => {
  try {
    const { password, ...userData } = User.parse(req.body);
    const hash = await argon2.hash(password);

    const result = await userRepository.create({
      ...userData, role: UserRole.CUSTOMER, hashedPassword: hash
    });

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    const user = result.unwrap();
    req.session.user = { id: user.id, email: user.email, role: user.role as UserRole };

    res.status(201).json(user);
  } catch (error) {
    errorResponseHandler(error as Error, res);
  }
}