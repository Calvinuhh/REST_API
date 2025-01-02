import UserModel from "../user";

export type CreateUserDTO = Omit<UserModel, "_id" | "token" | "confirmed">;
export type LoginUserDTO = Pick<UserModel, "email" | "password">;
