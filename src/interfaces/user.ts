import { Types } from "mongoose";

export default interface UserModel {
  _id: Types.ObjectId;
  email: string;
  password: string;
  token: string;
  confirmed: boolean;
}
