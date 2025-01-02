import { NextFunction, Request, Response } from "express";
import { securePassword, validateEmail } from "../utils/inputValidations";

export const newUserValidations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) throw Error(`Field ${key} is empty`);
    }
    if (!email || !password) throw Error("Email and password are required");

    validateEmail(email);
    securePassword(password, "password", 6);

    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
