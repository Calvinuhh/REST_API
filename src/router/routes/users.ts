import { Router } from "express";
import {
  registerController,
  loginController,
  authController,
  searchUserController,
} from "../../controllers/usersController";
import { newUserValidations } from "../../middlewares/newUserMiddleware";
import { authorization } from "../../middlewares/authorization";

const usersRouter: Router = Router();

usersRouter.post("/register", newUserValidations, registerController);
usersRouter.post("/login", loginController);
usersRouter.get("/auth/:token", authController);

usersRouter.get("/user", authorization, searchUserController);

export default usersRouter;
