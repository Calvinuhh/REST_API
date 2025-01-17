import { model, Schema } from "mongoose";
import OrderModel, { ProductModel } from "../interfaces/order";
import Product from "../models/Products";

const productSchema = new Schema<ProductModel>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new Schema<OrderModel>(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "client",
      required: true,
    },
    products: [productSchema],
    total: Number,
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

orderSchema.pre("save", async function (next) {
  let total = 0;

  for (const item of this.products) {
    const product = await Product.findById(item.product);
    if (product) {
      total += product.price * item.amount;
    }
  }

  this.total = total;
  next();
});

export default model<OrderModel>("order", orderSchema);
