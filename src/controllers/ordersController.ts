import { Request, Response } from "express";
import {
  createOrder,
  getAllorders,
  getOrdersByName,
} from "../services/orderServices";
import { CreateOrderDTO } from "../interfaces/DTOs/orderDTOs";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const { client, products }: CreateOrderDTO = req.body;

    const newOrder = await createOrder({ client, products });

    res.status(201).json(newOrder);
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const { names } = req.query;

    names === "true"
      ? res.status(200).json(await getOrdersByName())
      : res.status(200).json(await getAllorders());
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
