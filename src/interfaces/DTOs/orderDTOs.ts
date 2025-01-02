import OrderModel from "../order";

export type CreateOrderDTO = Omit<OrderModel, "_id" | "total" | "userId">;
