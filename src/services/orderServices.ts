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
      select: "name email phone -_id",
    })
    .populate({
      path: "products.product",
      select: "name image -_id",
    });

  if (orders) {
    const ordersMaped = orders.map(({ _id, client, products, total }) => {
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

    return ordersMaped;
  } else throw Error("No orders found");
};

export const getOrderById = async (id: string) => {
  const order = await Order.findOne({ _id: id });

  if (order)
    return {
      _id: order._id,
      client: order.client,
      products: order.products.map(({ product, amount }) => {
        return {
          product,
          amount,
        };
      }),
      total: order.total,
    };
  else throw Error("Order not found");
};

export const getOrderByIdByName = async (id: string) => {
  const order = await Order.findOne({ _id: id })
    .populate({
      path: "client",
      select: "name email phone -_id",
    })
    .populate({
      path: "products.product",
      select: "name image -_id",
    });

  if (order) {
    return {
      _id: order._id,
      client: order.client,
      products: order.products.map(({ product, amount }) => {
        return {
          product,
          amount,
        };
      }),
      total: order.total,
    };
  } else throw Error("Order not found");
};

export const deleteOrderById = async (id: string) => {
  const order = await Order.findOneAndDelete({ _id: id });

  if (order) return `Order ${order._id} deleted`;
  else throw Error("Order not found");
};
