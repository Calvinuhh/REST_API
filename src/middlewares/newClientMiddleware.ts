import { NextFunction, Request, Response } from "express";
import {
  validateEmail,
  validateLengthFromTo,
  validateOnlyLetters,
  validatePhone,
  validatePhoneMaxLength,
} from "../utils/inputValidations";

export const newClientValidations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, lastname, email, phone } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) throw new Error(`Field ${key} is empty`);
    }

    if (!name) throw Error("Name is required");
    if (!lastname) throw Error("Lastname is required");
    if (!email) throw Error("Email is required");
    if (!phone) throw Error("Phone is required");

    validateOnlyLetters({ name, lastname });
    validateEmail(email);

    validateLengthFromTo(name, "name", 2, 100);
    validateLengthFromTo(lastname, "lastname", 2, 100);

    validatePhone(phone);
    validatePhoneMaxLength(phone);

    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
