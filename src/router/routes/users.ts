import { Router } from "express";
import {
  registerController,
  loginController,
  authController,
} from "../../controllers/usersController";
import { newUserValidations } from "../../middlewares/newUserMiddleware";

const usersRouter: Router = Router();

usersRouter.post("/register", newUserValidations, registerController);
usersRouter.post("/login", loginController);
usersRouter.get("/auth/:token", authController);

export default usersRouter;
