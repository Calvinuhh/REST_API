import ClientModel from "../client";
import { Types } from "mongoose";

export type CreateClientDTO = Omit<ClientModel, "_id" | "active">;

export interface UpdateClientDTO extends Omit<ClientModel, "email" | "active"> {
  userId: Types.ObjectId;
}
