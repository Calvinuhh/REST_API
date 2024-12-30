import { Request, Response } from "express";
import { getAllProducts, createProduct } from "../services/productsServices";


export const getProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    res.status(200).json(products);
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const { name, price, image } = req.body;

    const newProduct = await createProduct({
      name,
      price,
      image,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
