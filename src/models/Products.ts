import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { versionKey: false }
);

export default model("products", productSchema);
