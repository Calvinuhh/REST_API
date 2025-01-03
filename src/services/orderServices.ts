import { CreateOrderDTO } from "../interfaces/DTOs/orderDTOs";
import Order from "../models/Order";
import Client from "../models/Client";
import Product from "../models/Products";
import { Types } from "mongoose";

export const createOrder = async (data: CreateOrderDTO) => {
  const { client, products, userId } = data;

  const clientExists = await Client.findOne({ _id: client, userId });
  if (!clientExists) throw new Error("Client not found");

  for (const { product } of products) {
    const productExists = await Product.findOne({ _id: product, userId });
    if (!productExists)
      throw Error("One or more products do not exist in your products");
  }
  const newOrder = await Order.create({
    client,
    products,
    userId,
  });

  return newOrder;
};

export const getAllorders = async (userId: Types.ObjectId) => {
  const orders = await Order.find({ userId }).select("-userId");

  if (orders.length === 0) {
    throw new Error("No orders found");
  }

  return orders;
};

export const getOrdersByName = async (userId: Types.ObjectId) => {
  const orders = await Order.find({ userId })
    .select("-userId")
    .populate({
      path: "client",
      select: "name email phone -_id",
    })
    .populate({
      path: "products.product",
      select: "name -_id",
    });

  if (orders.length === 0) throw Error("No orders found");

  return orders;
};

export const getOrderById = async (_id: string, userId: Types.ObjectId) => {
  const order = await Order.findOne({ _id, userId }).select("-userId");

  if (!order) throw Error("Order not found");

  return order;
};

export const getOrderByIdByName = async (
  _id: string,
  userId: Types.ObjectId
) => {
  const order = await Order.findOne({ _id, userId })
    .select("-userId")
    .populate({
      path: "client",
      select: "name email phone -_id",
    })
    .populate({
      path: "products.product",
      select: "name -_id",
    });

  if (!order) throw Error("Order not found");

  return order;
};

export const deleteOrderById = async (_id: string, userId: Types.ObjectId) => {
  const order = await Order.findOneAndDelete({ _id, userId });

  if (order) return `Order ${order._id} deleted`;
  else throw Error("Order not found");
};
