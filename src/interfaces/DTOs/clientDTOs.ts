import ClientModel from "../client";

export type CreateClientDTO = Omit<ClientModel, "_id">;

export type OnlyLetters = Pick<ClientModel, "name" | "lastname">;

export type UpdateClient = Omit<ClientModel, "email">;
