import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import {
  validateLengthFromTo,
  validateOnlyNumbers,
  validatePhone,
  validatePhoneMaxLength,
  validateStrings,
  validateStringsAndDot,
} from "../utils/inputValidations";

export const patchClientValidations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, lastname, phone } = req.body;

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

    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const patchProductValidations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) throw Error(`Field ${key} is empty`);
    }

    if (name) {
      validateStringsAndDot(name, "name");
      validateLengthFromTo(name, "name", 2, 100);
    }

    if (price) {
      validateOnlyNumbers(price, "price");
    }

    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
