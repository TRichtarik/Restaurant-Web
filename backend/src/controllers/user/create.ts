import { Request, Response } from "express";
import { errorResponseHandler } from "../common";
import { User } from "./types";
import argon2 from "argon2";
import userRepository from "../../repositories/user";
import { UserRole } from "../../models/user";

export const createController = async (req: Request, res: Response) => {
  try {
    const { password, ...userData } = User.parse(req.body);
    const hash = await argon2.hash(password);

    const result = await userRepository.create({
      ...userData, role: userData.role as UserRole, hashedPassword: hash
    });

    if (result.isErr) {
      errorResponseHandler(result.error, res);
      return;
    }

    res.status(201).json({ user: result.unwrap() });
  } catch (error) {
    errorResponseHandler(error as Error, res);
  }
}