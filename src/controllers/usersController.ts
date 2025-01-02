import { Request, Response } from "express";
import { register, auth, login } from "../services/usersServices";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const newUser = await register({ email, password });

    if (newUser)
      res
        .status(201)
        .json("User created, check your email to confirm your account");
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const auth = await login({ email, password });

    res.status(200).json({
      message: "Successfully authenticated",
      token: auth,
    });
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const authController = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    res.status(200).json(await auth(token));
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};
