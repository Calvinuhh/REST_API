import { Types } from "mongoose";

export type ProductModel = {
  product: Types.ObjectId;
  amount: number;
};

export default interface OrderModel {
  _id: Types.ObjectId;
  client: Types.ObjectId;
  products: Array<ProductModel>;
  total: number;
  userId: Types.ObjectId;
}
