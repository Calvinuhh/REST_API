import { model, Schema } from "mongoose";
import ClientModel from "../interfaces/client";

const clientSchema = new Schema<ClientModel>(
  {
    name: {
      type: String,
      trim: true,
      match: /^[a-zA-ZñÑ\s]+$/,
      minLength: 2,
      maxLength: 100,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      match: /^[a-zA-ZñÑ\s]+$/,
      minLength: 2,
      maxLength: 100,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      unique: true,
    },
    company: {
      type: String,
      trim: true,
      match: /^[a-zA-ZñÑ0-9 ]+$/,
      minLength: 1,
      maxLength: 100,
    },
    phone: {
      type: String,
      trim: true,
      match: /^[0-9+\s]+$/,
      required: true,
      maxlength: 20,
    },
  },
  {
    versionKey: false,
  }
);

export default model<ClientModel>("client", clientSchema);
