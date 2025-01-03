import { enviarEmail } from "../email/email";
import { CreateUserDTO, LoginUserDTO } from "../interfaces/DTOs/userDTOs";
import User from "../models/User";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Types } from "mongoose";

process.loadEnvFile();
const { JWT_SECRET, CLIENT_URL } = process.env;

export const register = async (data: CreateUserDTO) => {
  const { email, password } = data;

  const userExists = await User.findOne({ email });
  if (userExists) throw Error("User already exists");

  const newUser = await User.create({
    email,
    password: await hash(password, 10),
    token: Math.random().toString(36).substring(2) + Date.now().toString(36),
  });

  if (newUser) enviarEmail(newUser.email, newUser.token);

  return newUser;
};

export const login = async (data: LoginUserDTO) => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) throw Error("User not found");

  if (!user.confirmed) throw Error("User not confirmed");

  const checkPassword = await compare(password, user.password);

  if (!checkPassword) throw Error("Invalid password");

  const payload = { id: user._id.toString() };
  const jwt = sign(payload, JWT_SECRET as string, {
    expiresIn: "5h",
  });

  return jwt;
};

export const auth = async (token: string) => {
  const user = await User.findOne({ token });

  if (!user) throw Error("Invalid token");

  if (user.confirmed) throw Error("User already confirmed");

  user.confirmed = true;
  user.token = "";

  await user.save();

  return `User confirmed, you can login now on: ${CLIENT_URL}/login`;
};

export const getUserById = async (_id: Types.ObjectId) => {
  const user = await User.findById(_id).select("-password -token -confirmed");

  if (!user) throw Error("User not found");

  return user;
};
