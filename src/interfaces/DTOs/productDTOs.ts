import ProductModel from "../product";
import { Types } from "mongoose";

export type CreateProductDTO = Omit<ProductModel, "_id" | "active">;

export interface UpdateProductDTO extends Omit<ProductModel, "active"> {
  userId: Types.ObjectId;
}
