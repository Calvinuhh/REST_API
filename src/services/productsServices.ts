import {
  CreateProductDTO,
  UpdateProductDTO,
} from "../interfaces/DTOs/productDTOs";
import Product from "../models/Products";
import { Types } from "mongoose";

export const createProduct = async (product: CreateProductDTO) => {
  const { name, price, userId } = product;

  const newProduct = await Product.create({
    name,
    price,
    userId,
  });

  return newProduct;
};

export const getAllProducts = async (userId: Types.ObjectId) => {
  const products = await Product.find({ userId, active: true });

  if (products.length === 0) throw Error("No Products found");

  return products;
};

export const getProductById = async (_id: string, userId: Types.ObjectId) => {
  const product = await Product.findOne({ _id, userId, active: true });

  if (!product) throw Error("Product not found");

  return product;
};

export const updateProduct = async (data: UpdateProductDTO) => {
  const { _id, name, price, userId } = data;

  const newData: Partial<CreateProductDTO> = {};

  if (name) newData.name = name;
  if (price) newData.price = price;

  if (Object.keys(newData).length === 0) throw Error("No data to update");

  const newProduct = await Product.findOneAndUpdate(
    {
      _id,
      userId,
      active: true,
    },
    newData,
    {
      new: true,
    }
  );

  if (!newProduct) throw Error("Product not found");

  return newProduct;
};

export const deleteProduct = async (_id: string, userId: Types.ObjectId) => {
  const product = await Product.findOneAndUpdate(
    { _id, userId, active: true },
    {
      active: false,
    }
  );

  if (!product) throw Error("Product not found");

  return `Product ${product.name} deleted`;
};
