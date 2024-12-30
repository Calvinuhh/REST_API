import { NextFunction, Request, Response } from "express";
import {
  validateCompany,
  validateEmail,
  validateLengthFromTo,
  validateOnlyLetters,
} from "../utils/inputValidations";

export const newClientValidations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, lastname, email, company } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) throw new Error(`Field ${key} is empty`);
    }

    if (!name) throw Error("Name is required");
    if (!lastname) throw Error("Lastname is required");
    if (!email) throw Error("Email is required");

    validateOnlyLetters({ name, lastname });
    validateEmail(email);

    validateLengthFromTo(name, "name", 2, 100);
    validateLengthFromTo(lastname, "lastname", 2, 100);

    if (company) {
      validateCompany(company);
      validateLengthFromTo(company, "company", 3, 100);
    }

    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
