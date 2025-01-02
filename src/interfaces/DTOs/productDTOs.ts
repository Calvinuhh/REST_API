import ProductModel from "../product";
import { Types } from "mongoose";

export type CreateProductDTO = Omit<ProductModel, "_id">;

export interface UpdateProductDTO extends ProductModel {
  userId: Types.ObjectId;
}
