import { Types } from "mongoose";

export default interface ClientModel {
  _id: Types.ObjectId;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  active: boolean;
  userId: Types.ObjectId;
}
