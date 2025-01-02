import { Request, Response } from "express";
import {
  createOrder,
  getAllorders,
  getOrderById,
  getOrdersByName,
  getOrderByIdByName,
  deleteOrderById,
} from "../services/orderServices";
import { CreateOrderDTO } from "../interfaces/DTOs/orderDTOs";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const { client, products }: CreateOrderDTO = req.body;

    const newOrder = await createOrder({
      client,
      products,
      userId: req.userId,
    });

    if (newOrder) res.status(201).json("Order created successfully");
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const { names } = req.query;

    names === "true"
      ? res.status(200).json(await getOrdersByName(req.userId))
      : res.status(200).json(await getAllorders(req.userId));
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const getOrderByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { names } = req.query;

    names === "true"
      ? res.status(200).json(await getOrderByIdByName(id, req.userId))
      : res.status(200).json(await getOrderById(id, req.userId));
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};

export const deleteOrderByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    res.status(200).json(await deleteOrderById(id, req.userId));
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};
