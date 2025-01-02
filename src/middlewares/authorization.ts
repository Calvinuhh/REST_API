import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Types } from "mongoose";
import { getUserById } from "../services/usersServices";

process.loadEnvFile();
const { JWT_SECRET } = process.env as { JWT_SECRET: string };

declare global {
  namespace Express {
    interface Request {
      userId: Types.ObjectId;
    }
  }
}

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw Error("Must provide authorization header");

    const token = authorization?.split(" ")[1];
    if (!token) throw Error("No token provided");

    if (token) {
      const decoded = verify(token, JWT_SECRET);

      if (typeof decoded === "object" && decoded.id) {
        const { id } = decoded;

        if (!Types.ObjectId.isValid(id)) throw Error("Invalid token");

        const user = await getUserById(id);

        if (user) req.userId = user.id;
      }
    }
    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
