import ClientModel from "../client";

export type CreateClientDTO = Omit<ClientModel, "id">;
export type OnlyLetters = Pick<ClientModel, "name" | "lastname">;
