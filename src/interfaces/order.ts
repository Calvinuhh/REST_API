import { Types } from "mongoose";

type Product = {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  amount: number;
};

export default interface OrderModel {
  _id: Types.ObjectId;
  client: Types.ObjectId;
  products: Product[];
  total: number;
}
