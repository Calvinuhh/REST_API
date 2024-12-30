import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export const validateObjectIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) throw Error("Invalid ID");

    next();
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};
