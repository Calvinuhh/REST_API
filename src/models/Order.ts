import { model, Schema, Types } from "mongoose";
import OrderModel from "../interfaces/order";
import Product from "../models/Products";

const orderSchema = new Schema<OrderModel>(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "client",
    },
    products: [
      {
        product: {
          type: Types.ObjectId,
          ref: "product",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    total: Number,
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
