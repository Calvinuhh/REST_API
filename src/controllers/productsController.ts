import { Request, Response } from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../services/productsServices";

import { Types } from "mongoose";
import {
  CreateProductDTO,
  UpdateProductDTO,
} from "../interfaces/DTOs/productDTOs";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const { name, price }: CreateProductDTO = req.body;

    const newProduct = await createProduct({
      name,
      price,
      userId: req.userId,
    });

    if (newProduct) res.status(201).json("Product created successfully");
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts(req.userId);

    res.status(200).json(products);
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id, req.userId);

    res.status(200).json(product);
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price }: UpdateProductDTO = req.body;

    const newProduct = await updateProduct({
      _id: new Types.ObjectId(id),
      name,
      price,
      userId: req.userId,
    });

    if (newProduct) res.status(200).json("Product updated successfully");
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteProduct(id, req.userId);

    res.status(200).json("product deleted");
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};
