import { Request, Response } from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../services/productsServices";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    const imageName = req.file?.filename;

    const newProduct = await createProduct({
      name,
      price,
      image: imageName,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    res.status(200).json(products);
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);

    res.status(200).json(product);
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const imageName = req.file?.filename;

  const newProduct = await updateProduct({
    _id: id,
    name,
    price,
    image: imageName,
  });

  res.status(200).json(newProduct);
  try {
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteProduct(id);

    res.status(200).json("product deleted");
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
