import { NextFunction, Request, Response } from "express";
import {
  securePassword,
  validateEmail,
  validateLengthFromTo,
  validateStrings,
} from "../utils/inputValidations";

export const newUserValidations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) throw Error(`Field ${key} is empty`);
    }
    if (!name) throw Error("Email is required");
    if (!email) throw Error("name is required");
    if (!password) throw Error("password is required");

    validateStrings(name, "name");
    validateLengthFromTo(name, "name", 2, 100);

    validateEmail(email);
    securePassword(password, "password", 6);

    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
