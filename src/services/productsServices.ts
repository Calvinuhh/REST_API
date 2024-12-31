import { CreateProductDTO } from "../interfaces/DTOs/productDTOs";
import ProductModel from "../interfaces/product";
import Product from "../models/Products";

export const createProduct = async (product: CreateProductDTO) => {
  const { name, price, image } = product;

  const newProduct = await Product.create({
    name,
    image,
    price,
  });

  return newProduct;
};

export const getAllProducts = async () => {
  const products = await Product.find();

  if (products.length === 0) throw Error("No Products found");

  return products;
};

export const getProductById = async (_id: string) => {
  const product = await Product.findById(_id);

  if (!product) throw Error("Product not found");

  return product;
};

export const updateProduct = async (data: ProductModel) => {
  const { _id, name, price, image } = data;

  const newData: Partial<CreateProductDTO> = {};

  if (name) newData.name = name;
  if (price) newData.price = price;
  if (image) newData.image = image;

  if (Object.keys(newData).length === 0) throw Error("No data to update");

  const newProduct = await Product.findByIdAndUpdate(_id, newData, {
    new: true,
  }).select(`${name && "name"}  ${price && "price"} ${image && "image"}`);

  if (!newProduct) throw Error("Product not found");

  return newProduct;
};

export const deleteProduct = async (_id: string) => {
  const product = await Product.findByIdAndDelete(_id);

  if (!product) throw Error("Product not found");

  return product;
};
