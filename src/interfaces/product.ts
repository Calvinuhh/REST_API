import { Types } from "mongoose";

export default interface ProductModel {
  _id: Types.ObjectId;
  name: string;
  price: number;
  userId: Types.ObjectId;
}
