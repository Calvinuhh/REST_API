import { NextFunction, Request, Response } from "express";

export const newProductValidations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, image } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) throw new Error(`Field ${key} is empty`);
    }
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
