import ProductModel from "../product";

export type CreateProductDTO = Omit<ProductModel, "_id">;

