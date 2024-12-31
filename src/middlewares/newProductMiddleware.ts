import { NextFunction, Request, Response } from "express";
import {
  validateLengthFromTo,
  validateOnlyNumbers,
  validateStringsAndDot,
} from "../utils/inputValidations";

export const newProductValidations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) throw new Error(`Field ${key} is empty`);
    }

    if (!name) throw new Error("Name is required");
    if (!price) throw new Error("Price is required");

    validateStringsAndDot(name, "name");
    validateOnlyNumbers(price, "price");

    validateLengthFromTo(name, "name", 2, 100);

    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
