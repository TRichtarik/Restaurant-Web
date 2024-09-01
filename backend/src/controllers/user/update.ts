import { Request, Response } from "express";
import { errorResponseHandler } from "../common";
import { UserUpdate} from "./types";
import argon2 from "argon2";
import userRepository from "../../repositories/user";
import {UserRole} from "../../models/user";

export const updateController = async (req: Request, res: Response) => {
  try {
    const userId = req.session.user?.id;

    if (!userId) {
      res.status(404).json({ message: 'Something went wrong' });
      return;
    }

    const { password, ...userData } = UserUpdate.parse(req.body);
    const hash = password === undefined ? password : await argon2.hash(password);

    const result = await userRepository.update({
      id: userId, ...userData, hashedPassword: hash
    });

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    const user = result.unwrap();
    req.session.user = { id: user.id, email: user.email, role: user.role as UserRole };

    res.status(200).json(user);
  } catch (error) {
    errorResponseHandler(error as Error, res);
  }
}