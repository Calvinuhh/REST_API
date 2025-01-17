import { Types } from "mongoose";

export default interface ProductModel {
  _id: Types.ObjectId;
  name: string;
  price: number;
  active: boolean;
  userId: Types.ObjectId;
}
