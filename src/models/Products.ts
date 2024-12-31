import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 100,
      match: /^[a-zA-ZñÑ\s.]+$/,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { versionKey: false }
);

export default model("products", productSchema);
