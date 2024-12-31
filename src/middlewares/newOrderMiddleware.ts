import { Request, Response, NextFunction } from "express";
import { CreateOrderDTO } from "../interfaces/DTOs/orderDTOs";
import { Types } from "mongoose";
import { validateOnlyNumbers } from "../utils/inputValidations";

export const newOrderValidations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { client, products }: CreateOrderDTO = req.body;

    if (!client) throw Error("Client is required");
    if (!products) throw Error("Products is required");

    if (!Types.ObjectId.isValid(client))
      throw Error("Client must be a valid ObjectId");

    if (!Array.isArray(products)) throw Error("Products must be an array");
    if (products.length === 0) throw Error("Products cannot be empty");
    if (!products.every((product) => Types.ObjectId.isValid(product.product)))
      throw Error("Product must be a valid ObjectId");

    for (const { amount } of products) {
      if (!amount) throw Error("Amount is required");
      validateOnlyNumbers(amount, "amount");
    }

    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
