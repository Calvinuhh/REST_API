import ClientModel from "../client";
import { Types } from "mongoose";

export type CreateClientDTO = Omit<ClientModel, "_id">;

export interface UpdateClientDTO extends Omit<ClientModel, "email"> {
  userId: Types.ObjectId;
}
