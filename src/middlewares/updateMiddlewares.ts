import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import {
  validateCompany,
  validateEmail,
  validateLengthFromTo,
  validatePhone,
  validatePhoneMaxLength,
  validateStrings,
} from "../utils/inputValidations";

export const patchClientValidations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, lastname, company, phone } = req.body;

    if (!Types.ObjectId.isValid(id)) throw Error("Invalid ID");

    for (const key in req.body) {
      if (!req.body[key]) throw Error(`Field ${key} is empty`);
    }

    if (name) {
      validateStrings(name, "name");
      validateLengthFromTo(name, "name", 2, 100);
    }

    if (lastname) {
      validateStrings(lastname, "lastname");
      validateLengthFromTo(lastname, "lastname", 2, 100);
    }

    if (phone) {
      validatePhone(phone);
      validatePhoneMaxLength(phone);
    }

    if (company) {
      validateCompany(company);
      validateLengthFromTo(company, "company", 1, 100);
    }

    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
