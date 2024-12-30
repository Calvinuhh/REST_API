import { CreateProductDTO } from "../interfaces/DTOs/productDTOs";
import Product from "../models/Products";

export const getAllProducts = async () => {
  const products = await Product.find();

  if (products.length === 0) throw Error("No Products found");

  return products;
};

export const createProduct = async (product: CreateProductDTO) => {
  const { image, name, price } = product;

  const newProduct = await Product.create({
    name,
    image,
    price,
  });

  return newProduct;
};
