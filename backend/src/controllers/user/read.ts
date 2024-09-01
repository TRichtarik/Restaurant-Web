import { Request, Response } from "express";
import { errorResponseHandler } from "../common";
import { UserParam } from "./types";

export const readSpecificController = async (req: Request, res: Response) => {
  try {
    const { userId } = UserParam.parse(req.params);

    res.status(200).json({ message: "Not yet implemented.", id: userId })
  } catch (e) {
    errorResponseHandler(e as Error, res);
  }
}