import { CreateOrderDTO } from "../interfaces/DTOs/orderDTOs";
import Order from "../models/Order";
import Client from "../models/Client";
import Product from "../models/Products";

export const createOrder = async (data: CreateOrderDTO) => {
  const { client, products } = data;

  const clientExists = await Client.findOne({ _id: client });
  if (!clientExists) throw new Error("Client not found");

  for (const { product } of products) {
    const productExists = await Product.findOne({ _id: product });
    if (!productExists)
      throw Error("One or more products do not exist in the database");
  }
  const newOrder = await Order.create({
    client,
    products,
  });

  return newOrder;
};

export const getAllorders = async () => {
  const orders = await Order.find();
  const odersMaped = orders.map(({ _id, client, products, total }) => {
    return {
      _id,
      client,
      products: products.map(({ product, amount }) => {
        return {
          product,
          amount,
        };
      }),
      total,
    };
  });

  if (odersMaped.length === 0) {
    throw new Error("No orders found");
  }

  return odersMaped;
};

export const getOrdersByName = async () => {
  const orders = await Order.find()
    .populate({
      path: "client",
      select: "name -_id",
    })
    .populate({
      path: "products.product",
      select: "name -_id",
    });

  if (orders.length === 0) {
    throw new Error("No orders found");
  }

  return orders;
};
