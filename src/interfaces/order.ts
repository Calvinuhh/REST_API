import { Types } from "mongoose";

type ProductOrder = {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  amount: number;
};

export default interface OrderModel {
  _id: Types.ObjectId;
  client: Types.ObjectId;
  products: ProductOrder[];
  total: number;
}
